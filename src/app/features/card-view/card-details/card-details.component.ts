import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ICard } from '../../shared/interfaces/card.interface';
import { CardService } from '../../shared/services/card.service';
import { FormatterService } from '../../shared/services/formatter.service';
import IButton from '../models/card-view-buttons.interface';
import ICardTemplate from '../models/card-view-card.interface';
import IList from '../models/card-view-list.interface';
import { ListFormatService } from '../services/list-format.service';
import { TemplateFormatService } from '../services/template-format.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['../_base.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailsComponent implements OnInit {
  cardInfo$: Observable<ICardTemplate>;
  list$: Observable<IList>;
  icon$: Observable<string>;
  logo$: Observable<string>;
  name$: Observable<string>;
  amount$: Observable<string>;
  buttons$: Observable<IButton[]>;
  background$: Observable<string>;

  constructor(
    private formatterService: FormatterService,
    private toListService: ListFormatService,
    private toTemplateService: TemplateFormatService,
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const card$ = this.route.params.pipe(
      map((params) => Number(params.id)),
      map((id) => {
        if (isNaN(id)) {
          throw new Error();
        }
        return this.cardService.getById(id);
      }),
      filter((v) => !!v),
      switchMap((v) => v)
    );
    this.initializeCard(card$);
  }

  initializeCard(card$: Observable<ICard>): void {
    this.background$ = card$.pipe(
      map((card) => this.cardService.determineBackground(card))
    );
    this.icon$ = card$.pipe(map((card) => card.iconPath));
    this.logo$ = card$.pipe(map((card) => card.iconPath));
    this.buttons$ = this.determineButtons(card$);
    this.name$ = card$.pipe(
      map((card) => this.formatterService.cardNumberHideMiddle(card.cardNumber))
    );
    this.amount$ = card$.pipe(
      map((card) =>
        this.formatterService.formatBalance(
          card.balance || card.availableAmount || 0,
          { currency: '$', toFixed: 2 }
        )
      )
    );
    this.list$ = card$.pipe(map((card) => this.toListService.cardToList(card)));
    this.cardInfo$ = card$.pipe(
      map((card) => this.toTemplateService.cardToTemplate(card))
    );
  }

  navigateToProducts() {
    this.router.navigateByUrl('/accounts-list');
  }

  determineButtons(card$: Observable<ICard>): Observable<IButton[]> {
    return card$.pipe(
      map((card) => {
        let buttons: IButton[] = [
          {
            text: 'DELETE',
            function: () => this.cardService.delete(card.id),
            callBack: this.navigateToProducts.bind(this),
          },
        ];
        if (!card.blocked) {
          buttons = buttons.concat([
            {
              text: 'BLOCK',
              function: () => {
                const newCard$ = this.cardService.update({
                  ...card,
                  blocked: true,
                });
                this.buttons$ = this.determineButtons(newCard$);
                return newCard$;
              },
            },
          ]);
        }
        return buttons;
      })
    );
  }
}
