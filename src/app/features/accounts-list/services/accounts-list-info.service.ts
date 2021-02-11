import { Injectable } from '@angular/core';
import { ICard } from '../../shared/interfaces/card.interface';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { ILoan } from '../../shared/interfaces/loan.interface';
import { CardService } from '../../shared/services/card.service';
import { DepositService } from '../../shared/services/deposit.service';
import { LoanService } from '../../shared/services/loan.service';
import AccountType from '../models/account-type.enum';
import IItem from '../models/list-item.entity';

@Injectable()
export class AccountsListInfoService {
  constructor(
    private cardService: CardService,
    private depositService: DepositService,
    private loanService: LoanService
  ) {}

  getCards() {
    return this.cardService.getAll();
  }

  getDeposits() {
    return this.depositService.getAll();
  }

  getLoans() {
    return this.loanService.getAll();
  }

  cardToItem(data: ICard): IItem {
    const balance = data.balance ?? data.availableAmount ?? 0;
    return {
      type:
        data.cardName === 'MASTER CARD'
          ? AccountType.mastercard
          : AccountType.visa,
      balance,
      amount: balance - (data.availableAmount ?? 0),
      additionalInfo: data.expirationDate,
      status: !data.blocked ? 'Active' : 'Blocked',
      number: data.accountNumber,
    };
  }

  depositToItem(data: IDeposit): IItem {
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
      `${data.expirationDate.substr(3, 2)}.${data.expirationDate.substr(
        0,
        2
      )}. ${data.expirationDate.substr(-4, 4)}`
    );
    return {
      type: AccountType.cumulative,
      balance: data.balance ?? 0,
      amount: data.accured ?? 0,
      additionalInfo: `${Math.round(data.depositRate * 100)}%`,
      status: `${monthNames[expiration.getMonth()].substr(
        0,
        3
      )} ${expiration.getFullYear()}`,
    };
  }

  loanToItem(data: ILoan): IItem {
    return {
      type:
        data.loanName === 'Mortgage loan'
          ? AccountType.mortgage
          : AccountType.consumer,
      balance: data.amount ?? 0,
      amount: data.paid ?? 0,
      additionalInfo: `${Math.round(data.loanRate * 100)}%`,
      status: data.status ? 'Active' : 'Paid',
    };
  }
}
