import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ICard } from '../shared/interfaces/card.interface';
import { IDeposit } from '../shared/interfaces/deposit.interface';
import { ILoan } from '../shared/interfaces/loan.interface';
import IItem from './models/chart-item.entity';
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
  incomes$: Observable<Array<IItem>>;

  constructor(
    public infoService: AccountsListInfoService,
    private incomeService: AccountsListIncomeService
  ) {}

  ngOnInit(): void {
    this.cards$ = this.infoService.getCards();
    this.deposits$ = this.infoService.getDeposits();
    this.loans$ = this.infoService.getLoans();
    this.incomes$ = this.incomeService.getAll();
  }
}
