import { Component, OnInit } from '@angular/core';
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
})
export class AccountsListComponent implements OnInit {
  cards: Array<ICard> = [];
  deposits: Array<IDeposit> = [];
  loans: Array<ILoan> = [];
  incomes: Array<IItem> = [];

  constructor(
    public infoService: AccountsListInfoService,
    private incomeService: AccountsListIncomeService
  ) {}

  ngOnInit(): void {
    this.infoService.getCards().subscribe((v) => (this.cards = v));
    this.infoService.getDeposits().subscribe((v) => (this.deposits = v));
    this.infoService.getLoans().subscribe((v) => (this.loans = v));
    this.incomeService.getAll().subscribe((v) => (this.incomes = v));
  }
}
