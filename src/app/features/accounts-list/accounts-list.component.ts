import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICard } from '../shared/interfaces/card.interface';
import { IDeposit } from '../shared/interfaces/deposit.interface';
import { ILoan } from '../shared/interfaces/loan.interface';
import IItem from './models/chart-item.interface';
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
  incomeColumns$: Observable<number>;

  private readonly MAX_COLUMNS_CHARTS = 3;

  constructor(
    public infoService: AccountsListInfoService,
    private incomeService: AccountsListIncomeService
  ) {}

  ngOnInit(): void {
    this.cards$ = this.infoService.getCards();
    this.deposits$ = this.infoService.getDeposits();
    this.loans$ = this.infoService.getLoans();

    this.incomes$ = combineLatest([
      this.incomeService.generateCardsChart(this.cards$),
      this.incomeService.generateDepositChart(this.deposits$),
      this.incomeService.generateLoansChart(this.loans$),
    ]).pipe(map((val) => val.filter((v) => v).map((v) => of(v))));

    this.incomeColumns$ = this.incomes$.pipe(
      map((incomes) => incomes.length),
      map((length) => Math.min(length, this.MAX_COLUMNS_CHARTS))
    );
  }
}
