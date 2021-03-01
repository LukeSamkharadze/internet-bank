import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankTransfer } from '../../shared/interfaces/transfers/bankTransfer.interface';
import { ElectronicTransfer } from '../../shared/interfaces/transfers/electronicTransfer.interface';
import { InstantTransfer } from '../../shared/interfaces/transfers/instantTransfer.interface';
import { environment } from '../../../../environments/environment.prod';
import { ICard } from '../../shared/interfaces/card.interface';
import { forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CardService } from '../../shared/services/card.service';
import { PaymentLimitsService } from '../../shared/services/payment-limits.service';
import { AuthService } from '../../shared/services/auth.service';
import { TransactionService } from '../../shared/services/transaction.service';

@Injectable()
export class PaymentService {
  constructor(
    private http: HttpClient,
    private cardService: CardService,
    private authService: AuthService,
    private paymentsLimitsService: PaymentLimitsService,
    private transactionService: TransactionService
  ) {}
  currentUsersCards$ = this.cardService.cards$;

  bankTransfer(transfer: BankTransfer) {
    return this.getCardAndValidateBalance(
      transfer.fromAccountNumber,
      transfer.amount
    ).pipe(
      switchMap((card) =>
        forkJoin([of(card), this.checkBankPaymentsLimits(transfer.amount)])
      ),
      map(([card]) => {
        return card;
      }),
      switchMap((card) =>
        forkJoin([
          of(card),
          this.cardService.getCardByAccountNumber(transfer.toAccountNumber),
        ])
      ),
      tap(([fromAccount, destinationAccount]) => {
        if (!destinationAccount) {
          throw new Error('such user does not exist');
        }
        if (destinationAccount.accountNumber === fromAccount.accountNumber) {
          throw new Error('Can not make payment on same account');
        }
        transfer = {
          ...transfer,
          toUserId: destinationAccount.userId,
          title: `Bank transfer to user: ${destinationAccount.userId}`,
        };
      }),
      switchMap(([fromAccount, destinationAccount]) => {
        return forkJoin([
          this.removeBalance(fromAccount, Number(transfer.amount)),
          this.addBalance(destinationAccount, Number(transfer.amount), true),
        ]);
      }),
      switchMap(() => this.postTransactionToDb(transfer))
    );
  }

  instantTransfer(transfer: InstantTransfer) {
    return this.getCardAndValidateBalance(
      transfer.fromAccountNumber,
      transfer.amount
    ).pipe(
      tap(() => {
        transfer = {
          ...transfer,
          title: `Instant transfer to ${transfer.toAccountNumber}`,
        };
      }),
      switchMap((fromAccount) =>
        this.removeBalance(fromAccount, Number(transfer.amount))
      ),
      switchMap(() => this.postTransactionToDb(transfer))
    );
  }

  electronicTransfer(transfer: ElectronicTransfer) {
    return this.getCardAndValidateBalance(
      transfer.fromAccountNumber,
      transfer.amount
    ).pipe(
      switchMap((fromAccount) =>
        forkJoin([
          of(fromAccount),
          this.checkElectronicPaymentsLimits(transfer.amount),
        ])
      ),
      map(([fromAccount]) => {
        transfer = {
          ...transfer,
          title: `electronic payment to ${transfer.toAccountEmail}`,
        };
        return fromAccount;
      }),
      switchMap((fromAccount) =>
        this.removeBalance(fromAccount, Number(transfer.amount))
      ),
      switchMap(() => this.postTransactionToDb(transfer))
    );
  }

  getCardAndValidateBalance(accountNumber: string, amount: number) {
    return this.cardService.getCardByAccountNumber(accountNumber).pipe(
      tap((card) => {
        if (card.availableAmount < amount) {
          throw new Error('not enough balance');
        }
      })
    );
  }

  checkBankPaymentsLimits(amount) {
    return forkJoin([
      this.paymentsLimitsService.getById(this.authService.userId),
      this.transactionService
        .getBankSpendings(this.authService.userId)
        .pipe(
          map((bankTransfers) =>
            bankTransfers.reduce((acc, curr) => acc + curr.amount, 0)
          )
        ),
    ]).pipe(
      tap(([limits, bankSpending]) => {
        if (bankSpending + amount > limits.bankLimit) {
          throw new Error('exceeds limits');
        }
      })
    );
  }

  checkElectronicPaymentsLimits(amount) {
    return forkJoin([
      this.paymentsLimitsService.getById(this.authService.userId),
      this.transactionService
        .getOnlineSpendings(this.authService.userId)
        .pipe(
          map((onlineTransfers) =>
            onlineTransfers.reduce((acc, curr) => acc + curr.amount, 0)
          )
        ),
    ]).pipe(
      tap(([limits, onlineSpendings]) => {
        if (onlineSpendings + amount > limits.onlineLimit) {
          throw new Error('exceeds limits');
        }
      })
    );
  }

  removeBalance(card: ICard, amountToRemove: number) {
    card.availableAmount -= amountToRemove;
    return this.cardService.update(card);
  }

  addBalance(card: ICard, amountToAdd: number, tax = false) {
    amountToAdd = tax ? amountToAdd - (amountToAdd * 2) / 100 : amountToAdd;
    card.availableAmount += amountToAdd;
    return this.cardService.update(card);
  }

  postTransactionToDb(
    transfer: ElectronicTransfer | BankTransfer | InstantTransfer
  ) {
    return this.http.post(environment.BaseUrl + 'transactions', {
      ...transfer,
      status: 'pending',
    });
  }
}
