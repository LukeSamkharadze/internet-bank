import { Component, OnInit } from '@angular/core';
import { IncomeDataType } from '../shared/components/income-chart/services/data/dataType';
import { IncomeDataService } from '../shared/components/income-chart/services/data/income-data.service';
import { ICard } from '../shared/interfaces/card.interface';
import { IDeposit } from '../shared/interfaces/deposit.interface';
import { ILoan } from '../shared/interfaces/loan.interface';
import { AccountsListInfoService } from './services/accounts-list-info.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit {
  cards: Array<ICard> = [];
  deposits: Array<IDeposit> = [];
  loans: Array<ILoan> = [];
  incomes: Array<IncomeDataType> = [];

  constructor(
    public infoService: AccountsListInfoService,
    private incomeService: IncomeDataService
  ) {}

  ngOnInit(): void {
    this.infoService.getCards().subscribe((v) => (this.cards = v));
    this.infoService.getDeposits().subscribe((v) => (this.deposits = v));
    this.infoService.getLoans().subscribe((v) => (this.loans = v));
    this.incomeService.getAll().subscribe((v) => (this.incomes = v));
  }
}
