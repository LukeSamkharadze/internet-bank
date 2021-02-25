import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankPayment } from '../../shared/interfaces/bankPayment.entity';
import { ElectronicPayment } from '../../shared/interfaces/electronicPayment.entity';
import { InstantPayment } from '../../shared/interfaces/instantPaymententity';
import { environment } from '../../../../environments/environment.prod';
import { ICard } from '../../shared/interfaces/card.interface';
import { forkJoin, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CardService } from '../../shared/services/card.service';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient, private cardService: CardService) {}

  currentUsersCards$ = this.cardService.cards$;

  bankTransfer(transfer: BankPayment) {
    return this.cardService
      .getCardByAccountNumber(transfer.fromAccountNumber)
      .pipe(
        tap((card) => {
          if (card.availableAmount < transfer.amount) {
            throw new Error('not enough balance');
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

  electronicOrInstantTransfer(transfer: ElectronicPayment | InstantPayment) {
    return this.cardService
      .getCardByAccountNumber(transfer.fromAccountNumber)
      .pipe(
        tap((card) => {
          if (card.availableAmount < transfer.amount) {
            throw new Error('not enough balance');
          }
          transfer = { ...transfer, title: 'money goin outside tbc' };
        }),
        switchMap((fromAccount) =>
          this.removeBalance(fromAccount, Number(transfer.amount))
        ),
        switchMap(() => this.postTransactionToDb(transfer))
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
    transfer: ElectronicPayment | BankPayment | InstantPayment
  ) {
    return this.http.post(environment.BaseUrl + 'transactions', transfer);
  }
}
