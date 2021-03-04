import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
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

  private paramsCard$: Observable<ICard>;

  constructor(
    private formatterService: FormatterService,
    private toListService: ListFormatService,
    private toTemplateService: TemplateFormatService,
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsCard$ = this.route.params.pipe(
      map((params) => Number(params.id)),
      map((id) => {
        if (isNaN(id)) {
          throw new Error();
        }
        return this.cardService.getById(id);
      }),
      filter((card$) => !!card$),
      switchMap((v) => v)
    );
    this.initializeCard(this.paramsCard$);
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
    return combineLatest([
      this.getDeleteButton(card$),
      this.getBlockButton(card$),
    ]);
  }

  getBlockButton(card$: Observable<ICard>): Observable<IButton> {
    const updatedCard$ = new Subject<ICard>();
    const blockButton$: Observable<IButton> = merge(card$, updatedCard$).pipe(
      map(
        (card) =>
          ({
            text: card.blocked ? 'UNBLOCK' : 'BLOCK',
            function: () => {
              const newCard$ = this.cardService.update({
                ...card,
                blocked: !card.blocked,
              });
              newCard$.subscribe((newCard) => updatedCard$.next(newCard));
              return newCard$;
            },
          } as IButton)
      )
    );

    return blockButton$;
  }

  getDeleteButton(card$: Observable<ICard>): Observable<IButton> {
    return card$.pipe(
      map((card) => ({
        text: 'DELETE',
        function: () => this.cardService.delete(card.id),
        callBack: this.navigateToProducts.bind(this),
      }))
    );
  }
}
