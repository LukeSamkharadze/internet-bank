import { Component, OnInit } from '@angular/core';
import AccountType from './models/account-type.enum';
import IItem from './models/list-item.entity';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit {
  infos: Array<IItem> = [
    {
      type: AccountType.visa,
      balance: 88200,
      amount: 1840,
      additionalInfo: '06/22',
      status: 'Active',
      number: 3210000000004008,
    },
    {
      type: AccountType.mastercard,
      balance: 66400,
      amount: 520,
      additionalInfo: '07/22',
      status: 'Active',
      number: 4008000000009464,
    },
    {
      type: AccountType.visa,
      balance: 0.0,
      amount: 0.0,
      additionalInfo: '01/18',
      status: 'Blocked',
      number: 3344123456789018,
    },
    {
      type: AccountType.cumulative,
      balance: 56400,
      amount: 640,
      additionalInfo: '3%',
      status: 'May 2018',
    },
    {
      type: AccountType.mortgage,
      balance: 84800,
      amount: 24800,
      additionalInfo: '14%',
      status: 'Active',
    },
    {
      type: AccountType.consumer,
      balance: 66400,
      amount: 650,
      additionalInfo: '18%',
      status: 'Paid',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  get cards(): Array<IItem> {
    return this.infos.filter(
      (v) => v.type === AccountType.visa || v.type === AccountType.mastercard
    );
  }

  get deposits(): Array<IItem> {
    return this.infos.filter((v) => v.type === AccountType.cumulative);
  }

  get loans(): Array<IItem> {
    return this.infos.filter(
      (v) => v.type === AccountType.mortgage || v.type === AccountType.consumer
    );
  }
}
