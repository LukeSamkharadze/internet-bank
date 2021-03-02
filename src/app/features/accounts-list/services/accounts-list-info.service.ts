import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ICard } from '../../shared/interfaces/card.interface';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { ILoan } from '../../shared/interfaces/loan.interface';
import { CardService } from '../../shared/services/card.service';
import { DateFormatterService } from '../../shared/services/date-formatter.service';
import { DepositService } from '../../shared/services/deposit.service';
import { FormatterService } from '../../shared/services/formatter.service';
import { LoanService } from '../../shared/services/loan.service';
import IItem from '../models/list-item.interface';

@Injectable()
export class AccountsListInfoService {
  constructor(
    private cardService: CardService,
    private depositService: DepositService,
    private loanService: LoanService,
    private formatService: FormatterService,
    private dateService: DateFormatterService
  ) {}

  // Getter Functions

  getCards(): Observable<ICard[]> {
    return this.cardService.cards$.pipe(
      startWith(true),
      switchMap(() => this.cardService.getAll())
    );
  }

  getDeposits() {
    return this.depositService.update$.pipe(
      startWith(true),
      switchMap(() => this.depositService.getAll())
    );
  }

  getLoans() {
    return this.loanService.update$.pipe(
      startWith(true),
      switchMap(() => this.loanService.getAll())
    );
  }

  // Casting Functions

  depositToInfo(deposit: IDeposit): IItem {
    const accured = deposit.accured || 0;
    const balance = deposit.balance || 0;
    const [day, month, year] = deposit.expirationDate
      .split('.')
      .map((v) => Number(v));
    return [
      {
        title: 'Name',
        value: deposit.depositName,
      },
      {
        title: 'Balance',
        value: this.formatService.formatBalance(balance, { currency: '$' }),
      },
      {
        title: 'Accured',
        value: this.formatService.formatBalance(accured, { currency: '$' }),
      },
      {
        title: 'Rate',
        value: this.formatService.formatBalance(
          Math.round(deposit.depositRate * 100),
          { currency: '%', toRight: true }
        ),
      },
      {
        title: 'End date',
        value: this.dateService.formatDate('mmm yyyy', year, month, day),
      },
    ];
  }

  cardToInfo(card: ICard): IItem {
    const available = card.availableAmount || 0;
    const balance = card.balance || available;
    return [
      {
        title: 'Card number',
        value: this.formatService.cardNumberHideMiddle(card.cardNumber),
      },
      {
        title: 'Balance',
        value: this.formatService.formatBalance(balance, { currency: '$' }),
      },
      {
        title: 'Blocked amount',
        value: this.formatService.formatBalance(balance - available, {
          currency: '$',
        }),
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
    const amount = loan.balance || 0;
    const paid = loan.paid || 0;
    return [
      {
        title: 'Name',
        value: loan.loanName,
      },
      {
        title: 'Amount',
        value: this.formatService.formatBalance(amount, { currency: '$' }),
      },
      {
        title: 'Paid amount',
        value: this.formatService.formatBalance(paid, { currency: '$' }),
      },
      {
        title: 'Rate',
        value: this.formatService.formatBalance(
          Math.round(loan.loanRate * 100),
          { currency: '%', toRight: true }
        ),
      },
      {
        title: 'Status',
        value: loan.blocked ? 'Paid' : 'Active',
      },
    ];
  }
}
