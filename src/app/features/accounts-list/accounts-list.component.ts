import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, from, Observable, of } from 'rxjs';
import {
  concatMap,
  first,
  map,
  mergeMap,
  scan,
  switchMap,
} from 'rxjs/operators';
import { ICard } from '../shared/interfaces/card.interface';
import { IDeposit } from '../shared/interfaces/deposit.interface';
import { ILoan } from '../shared/interfaces/loan.interface';
import { FormatterService } from '../shared/services/formatter.service';
import IItem from './models/chart-item.interface';
import IChartItem from './models/chart-server-item.interface';
import { AccountsListIncomeService } from './services/accounts-list-income.service';
import { AccountsListInfoService } from './services/accounts-list-info.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListComponent implements OnInit {
  cards$: Observable<Array<ICard>>;
  deposits$: Observable<Array<IDeposit>>;
  loans$: Observable<Array<ILoan>>;
  incomes$: Observable<Observable<IItem>[]>;

  constructor(
    public infoService: AccountsListInfoService,
    private incomeService: AccountsListIncomeService,
    private formatService: FormatterService
  ) {}

  ngOnInit(): void {
    this.cards$ = this.infoService.getCards();
    this.deposits$ = this.infoService.getDeposits();
    this.loans$ = this.infoService.getLoans();

    this.incomes$ = combineLatest([
      this.generateCardsChart(this.cards$),
      this.generateDepositChart(this.deposits$),
      this.generateLoansChart(this.loans$),
    ]).pipe(map((val) => val.map((v) => of(v))));
  }

  generateCardsChart(cards$: Observable<ICard[]>): Observable<IItem> {
    const cardsBalance$ = cards$.pipe(
      switchMap((cards) => from(cards)),
      map((card) => card.balance || card.availableAmount || 0),
      scan((acc, cur) => acc + cur, 0)
    );
    const cardsChart$ = combineLatest([
      cardsBalance$,
      this.incomeService.getForUser('card'),
    ]).pipe(
      map(
        ([balance, chart]) =>
          ({
            title: 'Cards balance',
            value: balance,
            data: chart.data,
          } as IItem)
      )
    );
    return cardsChart$;
  }

  generateDepositChart(deposits$: Observable<IDeposit[]>): Observable<IItem> {
    const deposit$ = deposits$.pipe(
      switchMap((deposits) => deposits),
      first()
    );
    const depositChart$ = combineLatest([
      deposit$,
      this.incomeService.getForUser('deposit'),
    ]).pipe(
      map(
        ([deposit, chart]) =>
          ({
            title: `Deposit (${this.formatService.formatBalance(
              Math.floor(deposit.depositRate * 100),
              { currency: '%', toRight: true }
            )} Rate)`,
            value: deposit.balance,
            data: chart.data,
          } as IItem)
      )
    );
    return depositChart$;
  }

  generateLoansChart(loans$: Observable<ILoan[]>): Observable<IItem> {
    const loansBalance$ = loans$.pipe(
      switchMap((loans) => loans),
      map((loan) => (loan.balance || loan.paid || 0) - (loan.paid || 0)),
      scan((acc, cur) => acc + cur, 0)
    );
    const loansChart$ = combineLatest([
      loansBalance$,
      this.incomeService.getForUser('loan'),
    ]).pipe(
      map(
        ([balance, chart]) =>
          ({
            title: 'Pending credit',
            value: balance,
            data: chart.data,
          } as IItem)
      )
    );
    return loansChart$;
  }
}
