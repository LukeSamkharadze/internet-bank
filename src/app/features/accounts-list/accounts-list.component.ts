import { Component, OnInit } from '@angular/core';
import { ICard } from '../shared/interfaces/card.interface';
import { IDeposit } from '../shared/interfaces/deposit.interface';
import { ILoan } from '../shared/interfaces/loan.interface';
import AccountType from './models/account-type.enum';
import IItem from './models/list-item.entity';
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

  constructor(public infoService: AccountsListInfoService) {}

  ngOnInit(): void {
    this.infoService.getCards().subscribe((v) => (this.cards = v));
    this.infoService.getDeposits().subscribe((v) => (this.deposits = v));
    this.infoService.getLoans().subscribe((v) => (this.loans = v));
  }
}
