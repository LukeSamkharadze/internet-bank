import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { ICard } from '../../shared/interfaces/card.interface';
import { CardService } from '../../shared/services/card.service';
import { FormatterService } from '../../shared/services/formatter.service';
import ICardTemplate from '../models/card-view-card.entity';
import IList from '../models/card-view-list.entity';
import { ToListFormatterService } from '../services/to-list-formatter.service';
import { ToTemplateFormatterService } from '../services/to-template-formatter.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit, OnDestroy {
  cardInfo$: Observable<ICardTemplate>;
  list$: Observable<IList>;
  icon: string;
  logo: string;
  name$: Observable<string>;
  amount$: Observable<string>;
  routerSub: Subscription;

  constructor(
    private formatterService: FormatterService,
    private toListService: ToListFormatterService,
    private toTemplateService: ToTemplateFormatterService,
    private cardService: CardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routerSub = this.route.params
      .pipe(
        map((params) => this.loadData(Number(params.id))),
        filter((v) => v !== null)
      )
      .subscribe((card$) => {
        this.name$ = card$.pipe(
          map((v) => this.formatterService.cardNumberHideMiddle(v.cardNumber))
        );
        this.amount$ = card$.pipe(
          map((v) =>
            this.formatterService.formatBalance(
              v.balance || v.availableAmount || 0,
              { currency: '$', toFixed: 2 }
            )
          )
        );
        this.list$ = card$.pipe(map((v) => this.toListService.cardToList(v)));
        this.cardInfo$ = card$.pipe(
          map((v) => this.toTemplateService.cardToTemplate(v))
        );
      });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  loadData(id: number): Observable<ICard> | null {
    if (isNaN(id)) {
      return null;
    }
    const card$ = this.cardService.getById(id).pipe(
      tap((v) => {
        this.icon = this.cardService.determineIconPath(v).iconPath;
        this.logo = this.cardService.determineIconPath(v, true).iconPath;
      })
    );
    return card$;
  }
}
