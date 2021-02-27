import { Injectable } from '@angular/core';
import { ICard } from '../../shared/interfaces/card.interface';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { ILoan } from '../../shared/interfaces/loan.interface';
import { DateFormatterService } from '../../shared/services/date-formatter.service';
import { FormatterService } from '../../shared/services/formatter.service';
import IList from '../models/card-view-list.interface';

@Injectable()
export class ListFormatService {
  constructor(
    private formatterService: FormatterService,
    private dateFormatterService: DateFormatterService
  ) {}

  cardToList(card: ICard): IList {
    const [expMonth, expYear] = card.expirationDate
      .split('/')
      .map((v) => Number(v));
    const balance = card.balance || card.availableAmount || 0;
    return [
      {
        title: 'Card name',
        value: card.cardName,
      },
      {
        title: 'Account number',
        value: card.accountNumber,
      },
      {
        title: 'Card number',
        value: this.formatterService.cardNumberHideMiddle(card.cardNumber),
      },
      {
        title: 'Cardholder',
        value: this.formatterService.capitalizeAllWord(card.cardholder),
      },
      {
        title: 'Expiration date',
        value: this.dateFormatterService.formatDate(
          'dd.mm.yyyy',
          expYear,
          expMonth
        ),
      },
      {
        title: 'Available amount',
        value: this.formatterService.formatBalance(balance, {
          currency: ' USD',
          toRight: true,
        }),
      },
      {
        title: '3D Security',
        value: card.security3D ? 'Enable' : 'Disable',
      },
    ];
  }

  depositToList(deposit: IDeposit): IList {
    const accured = deposit.accured || 0;
    const balance = deposit.balance || 0;
    return [
      {
        title: 'Name',
        value: deposit.depositName,
      },
      {
        title: 'Account number',
        value: deposit.accountNumber,
      },
      {
        title: 'Rate',
        value: this.formatterService.formatBalance(
          Math.round(deposit.depositRate * 100),
          { currency: '%', toRight: true }
        ),
      },
      {
        title: 'Start date',
        value: deposit.startDate,
      },
      {
        title: 'Expiration date',
        value: deposit.expirationDate,
      },
      {
        title: 'Available amount',
        value: this.formatterService.formatBalance(balance, {
          currency: ' USD',
          toRight: true,
        }),
      },
      {
        title: 'Accured interest',
        value: this.formatterService.formatBalance(accured, {
          currency: ' USD',
          toRight: true,
        }),
      },
    ];
  }

  loanToList(loan: ILoan): IList {
    const paid = loan.paid || 0;
    const balance = loan.balance || paid;
    return [
      {
        title: 'Name',
        value: loan.loanName,
      },
      {
        title: 'Account number',
        value: loan.accountNumber,
      },
      {
        title: 'Rate',
        value: this.formatterService.formatBalance(
          Math.round(loan.loanRate * 100),
          { currency: '%', toRight: true }
        ),
      },
      {
        title: 'Start date',
        value: loan.startDate,
      },
      {
        title: 'Expiration date',
        value: loan.expirationDate,
      },
      {
        title: 'Starting amount',
        value: this.formatterService.formatBalance(balance, {
          currency: ' USD',
          toRight: true,
        }),
      },
      {
        title: 'Paid interest',
        value: this.formatterService.formatBalance(paid, {
          currency: ' USD',
          toRight: true,
        }),
      },
    ];
  }
}
