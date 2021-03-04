import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICard } from '../shared/interfaces/card.interface';
import { IDeposit } from '../shared/interfaces/deposit.interface';
import { ILoan } from '../shared/interfaces/loan.interface';
import { CardService } from '../shared/services/card.service';
import { DepositService } from '../shared/services/deposit.service';
import { LoanService } from '../shared/services/loan.service';
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
    private incomeService: AccountsListIncomeService,
    private cardService: CardService,
    private depositService: DepositService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.cards$ = this.cardService.cards$;
    this.deposits$ = this.depositService.deposits$;
    this.loans$ = this.loanService.loans$;

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
