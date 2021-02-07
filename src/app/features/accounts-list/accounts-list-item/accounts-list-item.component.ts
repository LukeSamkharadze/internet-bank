import { Component, Input, OnInit } from '@angular/core';
import AccountType from '../models/account-type.enum';
import IItem from '../models/list-item.entity';
import ITitles from '../models/list-titles.entity';

@Component({
  selector: 'app-accounts-list-item',
  templateUrl: './accounts-list-item.component.html',
  styleUrls: ['./accounts-list-item.component.scss'],
})
export class AccountsListItemComponent implements OnInit {
  @Input() info: IItem;
  title: string;

  constructor() {}

  ngOnInit(): void {
    switch (this.info.type) {
      case AccountType.consumer:
        this.title = 'Consumer loan';
        break;
      case AccountType.mortgage:
        this.title = 'Mortgage loan';
        break;
      case AccountType.cumulative:
        this.title = 'Cumulative deposit';
        break;
      default:
        // AccountType Card
        if (!this.info.number) {
          this.title = 'unknown';
          break;
        }
        const strnum = this.info.number.toString();
        this.title =
          strnum.substr(0, 4) +
          Array(3).fill(' ').join(Array(5).join('*')) +
          strnum.substr(-4, 4);
        break;
    }
  }

  get titles(): ITitles {
    if (this.isCard) {
      return {
        type: 'Card number',
        balance: 'Balance',
        amount: 'Blocked amount',
        additionalInfo: 'Valid',
        status: 'Status',
      };
    } else if (this.isCumulative) {
      return {
        type: 'Name',
        balance: 'Balance',
        amount: 'Accured',
        additionalInfo: 'Rate',
        status: 'End date',
      };
    } else if (this.isMortgage || this.isConsumer) {
      return {
        type: 'Name',
        balance: 'Amount',
        amount: 'Paid amount',
        additionalInfo: 'Rate',
        status: 'Status',
      };
    }
  }

  get isCumulative(): boolean {
    return this.info.type === AccountType.cumulative;
  }

  get isMortgage(): boolean {
    return this.info.type === AccountType.mortgage;
  }

  get isConsumer(): boolean {
    return this.info.type === AccountType.consumer;
  }

  get isCard(): boolean {
    return !this.isCumulative && !this.isMortgage && !this.isConsumer;
  }

  get isVisa(): boolean {
    return this.info.type === AccountType.visa;
  }

  get isMasterCard(): boolean {
    return this.info.type === AccountType.mastercard;
  }
}
