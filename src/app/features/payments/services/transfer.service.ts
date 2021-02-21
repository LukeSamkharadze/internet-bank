import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankTransfer } from '../models/bankTransfer.entity';
import { ElectronicTransfer } from '../models/electronicTransfer.entity';
import { InstantTransfer } from '../models/instantTransfer.entity';
import { environment } from '../../../../environments/environment.prod';
import { ICard } from '../../shared/interfaces/card.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';
import { CardService } from '../../shared/services/card.service';
import { BaseHttpInterface } from '@shared/shared';

@Injectable()
export class TransferService {
  constructor(private http: HttpClient, private cardService: CardService) {}

  public paymentHappened$ = new BehaviorSubject(null);

  currentUsersCards$ = this.paymentHappened$.pipe(
    switchMapTo(this.cardService.getAll())
  );

  reloadCards() {
    this.paymentHappened$.next(null);
  }

  bankOrInstantTransfer(transfer: BankTransfer | InstantTransfer) {
    // payments limitsze checki daemateba roca damerjaven masterze.
    return new Observable((subscriber) => {
      this.cardService
        .getCardByCardNumber(transfer.fromAccount.cardNumber)
        .subscribe((acc) => {
          const fromAccount: ICard = acc[0]; // logged in user's card.
          if (fromAccount.availableAmount < transfer.amount) {
            subscriber.next({
              status: 'error',
              reason: 'not enough balance',
            });
            return;
          }
          this.cardService
            .getCardByAccountNumber(transfer.destinationAccountNumber)
            .subscribe((destAcc) => {
              const destinationAccount = destAcc[0];
              if (!destinationAccount) {
                subscriber.next({
                  status: 'error',
                  reason: 'such user does not exist',
                });
                return;
              }
              this.removeBalance(
                fromAccount,
                Number(transfer.amount)
              ).subscribe(() => {
                this.addBalance(
                  destinationAccount,
                  Number(transfer.amount),
                  true
                ).subscribe(() => {
                  subscriber.next({ status: 'success' });
                });
              });
            });
        });
    });
  }

  electronicTransfer(transfer: ElectronicTransfer) {
    // payments limitsze checki daemateba roca damerjaven masterze.
    return new Observable((subscriber) => {
      this.cardService
        .getCardByCardNumber(transfer.fromAccount.cardNumber)
        .subscribe((acc) => {
          const fromAccount: ICard = acc[0]; // logged in user's card.
          if (fromAccount.availableAmount < transfer.amount) {
            subscriber.next({
              status: 'error',
              reason: 'not enough balance',
            });
            return;
          }
          this.removeBalance(fromAccount, transfer.amount).subscribe(() => {
            subscriber.next({
              status: 'success',
            });
          });
        });
    });
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
    const transferForDb = {
      ...transfer,
      fromAccount: transfer.fromAccount.accountNumber,
    };
    return this.http.post(environment.BaseUrl + 'payments', transferForDb);
  }
}
