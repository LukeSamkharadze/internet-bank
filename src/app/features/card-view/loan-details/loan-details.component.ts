import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { ILoan } from '../../shared/interfaces/loan.interface';
import { FormatterService } from '../../shared/services/formatter.service';
import { LoanService } from '../../shared/services/loan.service';
import ICardTemplate from '../models/card-view-card.entity';
import IList from '../models/card-view-list.entity';
import { ToListFormatterService } from '../services/to-list-formatter.service';
import { ToTemplateFormatterService } from '../services/to-template-formatter.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss'],
})
export class LoanDetailsComponent implements OnInit, OnDestroy {
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
    private loanService: LoanService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routerSub = this.route.params
      .pipe(
        map((params) => this.loadData(Number(params.id))),
        filter((v) => v !== null)
      )
      .subscribe((loan$) => {
        this.color$ = loan$.pipe(
          map((v) => this.loanService.determineColor(v))
        );
        this.icon$ = loan$.pipe(map((v) => this.loanService.determineIcon(v)));
        this.name$ = loan$.pipe(map((v) => v.loanName));
        this.amount$ = loan$.pipe(
          map((v) =>
            this.formatterService.formatBalance(v.balance || v.paid || 0, {
              currency: '$',
              toFixed: 2,
            })
          )
        );
        this.list$ = loan$.pipe(map((v) => this.toListService.loanToList(v)));
        this.cardInfo$ = loan$.pipe(
          map((v) => this.toTemplateService.loanToTemplate(v))
        );
      });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  loadData(id: number): Observable<ILoan> | null {
    if (isNaN(id)) {
      return null;
    }
    const loan$ = this.loanService.getAll().pipe(
      switchMap((v) => v),
      filter((v) => v.id === id),
      first()
    );
    return loan$;
  }
}
