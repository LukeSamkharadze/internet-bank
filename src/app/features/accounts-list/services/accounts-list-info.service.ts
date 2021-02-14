import { Injectable } from '@angular/core';
import { ICard } from '../../shared/interfaces/card.interface';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { ILoan } from '../../shared/interfaces/loan.interface';
import { CardService } from '../../shared/services/card.service';
import { DepositService } from '../../shared/services/deposit.service';
import { LoanService } from '../../shared/services/loan.service';
import IItem from '../models/list-item.entity';

@Injectable()
export class AccountsListInfoService {
  constructor(
    private cardService: CardService,
    private depositService: DepositService,
    private loanService: LoanService
  ) {}

  // Getter Functions

  getCards() {
    return this.cardService.getAll();
  }

  getDeposits() {
    return this.depositService.getAll();
  }

  getLoans() {
    return this.loanService.getAll();
  }

  // Casting Functions

  depositToInfo(deposit: IDeposit): IItem {
    const accured = deposit.accured || 0;
    const balance = deposit.balance || 0;
    return [
      {
        title: 'Name',
        value: deposit.depositName,
      },
      {
        title: 'Balance',
        value: this.formatBalance(balance),
      },
      {
        title: 'Accured',
        value: this.formatBalance(accured),
      },
      {
        title: 'Rate',
        value: this.formatPercent(deposit.depositRate),
      },
      {
        title: 'End date',
        value: this.formatDate(deposit.expirationDate),
      },
    ];
  }

  cardToInfo(card: ICard): IItem {
    const available = card.availableAmount || 0;
    const balance = card.balance || available;
    return [
      {
        title: 'Card number',
        value: this.formatCardNumber(card.cardNumber.toString()),
      },
      {
        title: 'Balance',
        value: this.formatBalance(balance),
      },
      {
        title: 'Blocked amount',
        value: this.formatBalance(balance - available),
      },
      {
        title: 'Valid',
        value: card.expirationDate,
      },
      {
        title: 'Status',
        value: card.blocked ? 'Blocked' : 'Active',
      },
    ];
  }

  loanToInfo(loan: ILoan): IItem {
    const amount = loan.amount || 0;
    const paid = loan.paid || 0;
    return [
      {
        title: 'Name',
        value: loan.loanName,
      },
      {
        title: 'Amount',
        value: this.formatBalance(amount),
      },
      {
        title: 'Paid amount',
        value: this.formatBalance(paid),
      },
      {
        title: 'Rate',
        value: this.formatPercent(loan.loanRate),
      },
      {
        title: 'Status',
        value: loan.status ? 'Active' : 'Paid',
      },
    ];
  }

  // Helper Functions

  formatCardNumber(strnum: string): string {
    return (
      strnum.substr(0, 4) +
      Array(3).fill(' ').join(Array(5).join('*')) +
      strnum.substr(-4, 4)
    );
  }

  formatBalance(num: number): string {
    return (
      '$' +
      (num || num.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    );
  }

  formatDate(strdate: string): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const expiration = new Date(
      `${strdate.substr(3, 2)}.${strdate.substr(0, 2)}. ${strdate.substr(
        -4,
        4
      )}`
    );

    return `${monthNames[expiration.getMonth()].substr(
      0,
      3
    )} ${expiration.getFullYear()}`;
  }

  formatPercent(num: number): string {
    return Math.round(num * 100) + '%';
  }
}
