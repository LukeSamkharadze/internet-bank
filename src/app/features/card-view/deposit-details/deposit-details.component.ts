import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { DepositService } from '../../shared/services/deposit.service';
import { FormatterService } from '../../shared/services/formatter.service';
import ICardTemplate from '../models/card-view-card.entity';
import IList from '../models/card-view-list.entity';
import { ToListFormatterService } from '../services/to-list-formatter.service';
import { ToTemplateFormatterService } from '../services/to-template-formatter.service';

@Component({
  selector: 'app-deposit-details',
  templateUrl: './deposit-details.component.html',
  styleUrls: ['./deposit-details.component.scss'],
})
export class DepositDetailsComponent implements OnInit, OnDestroy {
  cardInfo$: Observable<ICardTemplate>;
  list$: Observable<IList>;
  name$: Observable<string>;
  amount$: Observable<string>;
  routerSub: Subscription;
  icon$: Observable<string>;
  color$: Observable<string>;

  constructor(
    private formatterService: FormatterService,
    private toListService: ToListFormatterService,
    private toTemplateService: ToTemplateFormatterService,
    private depositService: DepositService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routerSub = this.route.params
      .pipe(
        map((params) => this.loadData(Number(params.id))),
        filter((v) => v !== null)
      )
      .subscribe((deposit$) => {
        this.color$ = deposit$.pipe(
          map((v) => this.depositService.determineColor(v))
        );
        this.icon$ = deposit$.pipe(
          map((v) => this.depositService.determineIcon(v))
        );
        this.name$ = deposit$.pipe(map((v) => v.depositName));
        this.amount$ = deposit$.pipe(
          map((v) =>
            this.formatterService.formatBalance(v.balance || 0, {
              currency: '$',
              toFixed: 2,
            })
          )
        );
        this.list$ = deposit$.pipe(
          map((v) => this.toListService.depositToList(v))
        );
        this.cardInfo$ = deposit$.pipe(
          map((v) => this.toTemplateService.depositToTemplate(v))
        );
      });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  loadData(id: number): Observable<IDeposit> | null {
    if (isNaN(id)) {
      return null;
    }
    const deposit$ = this.depositService.getById(id);
    return deposit$;
  }
}
