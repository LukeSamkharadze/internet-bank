import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankTransfer } from '../../shared/interfaces/transfers/bankTransfer.interface';
import { ElectronicTransfer } from '../../shared/interfaces/transfers/electronicTransfer.interface';
import { environment } from '../../../../environments/environment.prod';
import { ICard } from '../../shared/interfaces/card.interface';
import { forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CardService } from '../../shared/services/card.service';
import { PaymentLimitsService } from '../../shared/services/payment-limits.service';
import { AuthService } from '../../shared/services/auth.service';
import { TransactionService } from '../../shared/services/transaction.service';
import { InternalTransfer } from '../../shared/interfaces/transfers/internalTransfer.interface';
import { SocketIoService } from '../../shared/services/socket-io.service';

@Injectable()
export class PaymentService {
  constructor(
    private http: HttpClient,
    private cardService: CardService,
    private authService: AuthService,
    private paymentsLimitsService: PaymentLimitsService,
    private transactionService: TransactionService,
    private socketIo: SocketIoService
  ) {}
  currentUsersCards$ = this.cardService.cards$;

  bankTransfer(transfer: BankTransfer) {
    return this.getCardAndValidateBalance(
      transfer.fromAccountNumber,
      transfer.amount
    ).pipe(
      tap((card) => {
        if (card.blocked) {
          throw new Error('Your card is blocked!');
        }
      }),
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
        if (destinationAccount) {
          if (destinationAccount.blocked) {
            throw new Error('Can not make payment to blocked card!');
          }
          if (destinationAccount.accountNumber === fromAccount.accountNumber) {
            throw new Error('Can not make payment on same account');
          }
          if (destinationAccount.userId === fromAccount.userId) {
            throw new Error(
              'Provided account number belong to you, use internal payment'
            );
          }
          transfer = {
            ...transfer,
            toUserId: destinationAccount.userId,
            title: `Internal Bank transfer to user: ${transfer.beneficiary}`,
          };
        } else {
          transfer = {
            ...transfer,
            title: `External Bank transfer to beneficiary: ${transfer.beneficiary}`,
          };
        }
      }),
      switchMap(([fromAccount, destinationAccount]) => {
        if (destinationAccount) {
          return forkJoin([
            this.removeBalance(fromAccount, Number(transfer.amount)),
            this.addBalance(destinationAccount, Number(transfer.amount), true),
          ]);
        } else {
          return this.removeBalance(fromAccount, Number(transfer.amount));
        }
      }),
      switchMap(() => this.postTransactionToDb(transfer))
    );
  }

  internalTransfer(transfer: InternalTransfer) {
    return this.getCardAndValidateBalance(
      transfer.fromAccountNumber,
      transfer.amount
    ).pipe(
      tap((card) => {
        if (card.blocked) {
          throw new Error('Your card is blocked!');
        }
      }),
      switchMap((card) =>
        forkJoin([
          of(card),
          this.cardService.getCardByAccountNumber(transfer.toAccountNumber),
        ])
      ),
      tap(([fromAccount, destinationAccount]) => {
        if (!destinationAccount) {
          throw new Error('Such account does not exist!');
        }
        if (destinationAccount.blocked) {
          throw new Error('Can not make payment to blocked card!');
        }
        if (destinationAccount.accountNumber === fromAccount.accountNumber) {
          throw new Error('Can not make payment on same account');
        }

        if (destinationAccount.userId !== fromAccount.userId) {
          throw new Error('Provided account number does not belong to you');
        }
        transfer = {
          ...transfer,
          title: `Transfer to my account ${destinationAccount.accountNumber}`,
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

  electronicTransfer(transfer: ElectronicTransfer) {
    return this.getCardAndValidateBalance(
      transfer.fromAccountNumber,
      transfer.amount
    ).pipe(
      tap((card) => {
        if (card.blocked) {
          throw new Error('Your card is blocked!');
        }
      }),
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
    transfer: ElectronicTransfer | BankTransfer | InternalTransfer
  ) {
    this.socketIo.emit('transaction', transfer);
    this.socketIo.emit('expanses', transfer);
    return this.http.post(environment.BaseUrl + 'transactions', {
      ...transfer,
      status: 'pending',
    });
  }
}
