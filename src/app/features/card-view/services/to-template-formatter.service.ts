import { Injectable } from '@angular/core';
import { ICard } from '../../shared/interfaces/card.interface';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { ILoan } from '../../shared/interfaces/loan.interface';
import { DateFormatterService } from '../../shared/services/date-formatter.service';
import { FormatterService } from '../../shared/services/formatter.service';
import ICardTemplate from '../models/card-view-card.entity';

@Injectable({
  providedIn: 'root',
})
export class ToTemplateFormatterService {
  constructor(
    private formatterService: FormatterService,
    private dateFormatterService: DateFormatterService
  ) {}

  cardToTemplate(card: ICard): ICardTemplate {
    const [expMonth, expYear] = card.expirationDate
      .split('/')
      .map((v) => Number(v));
    return [
      {
        title: 'Card number',
        value: this.formatterService.formatCardNumber(card.cardNumber, '  '),
      },
      [
        {
          title: 'Cardholder',
          value: this.formatterService.capitalizeAllWord(card.cardholder),
        },
        {
          title: 'Valid',
          value: this.dateFormatterService.formatDate(
            'mm / yy',
            expYear,
            expMonth
          ),
        },
      ],
    ];
  }

  depositToTemplate(deposit: IDeposit): ICardTemplate {
    const [, expMonth, expYear] = deposit.expirationDate
      .split('.')
      .map((v) => Number(v));
    return [
      {
        title: 'Type',
        value:
          this.formatterService.formatBalance(
            Math.round(deposit.depositRate * 100),
            { currency: '%', toRight: true }
          ) +
          ' ' +
          deposit.depositName,
      },
      [
        {
          title: 'Valid',
          value: this.dateFormatterService.formatDate(
            'mm / yy',
            expYear,
            expMonth
          ),
        },
      ],
    ];
  }

  loanToTemplate(loan: ILoan): ICardTemplate {
    const [, expMonth, expYear] = loan.expirationDate
      .split('.')
      .map((v) => Number(v));
    return [
      {
        title: 'Type',
        value:
          this.formatterService.formatBalance(Math.round(loan.loanRate * 100), {
            currency: '%',
            toRight: true,
          }) +
          ' ' +
          loan.loanName,
      },
      [
        {
          title: 'Valid',
          value: this.dateFormatterService.formatDate(
            'mm / yy',
            expYear,
            expMonth
          ),
        },
      ],
    ];
  }
}
