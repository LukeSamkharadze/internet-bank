import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankTransfer } from '../models/bankTransfer.entity';
import { ElectronicTransfer } from '../models/electronicTransfer.entity';
import { InstantTransfer } from '../models/instantTransfer.entity';
import { environment } from '../../../../environments/environment.prod';
import { ICard } from '../../shared/interfaces/card.interface';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TransferService {
  constructor(private http: HttpClient) {}

  public currentUsersCards = this.http.get<ICard[]>(environment.URL + 'cards');

  bankOrInstantTransfer(transfer: BankTransfer | InstantTransfer) {
    return new Observable((subscriber) => {
      this.http
        .get<ICard[]>(
          environment.URL +
            `cards?cardNumber=${transfer.fromAccount.cardNumber}`
        )
        .subscribe((acc) => {
          const fromAccount: ICard = acc[0];
          if (fromAccount.availableAmount < transfer.amount) {
            subscriber.next({
              status: 'error',
              reason: 'not enough balance',
            });
            return;
          } else {
            this.http
              .get<ICard[]>(
                environment.URL +
                  `cards?accountNumber=${transfer.destinationAccountNumber}`
              )
              .subscribe((destAcc) => {
                const destinationAccount = destAcc[0];
                if (!destinationAccount) {
                  subscriber.next({
                    status: 'error',
                    reason: 'such user does not exist',
                  });
                  return;
                } else {
                  this.removeBalance(
                    fromAccount,
                    Number(transfer.amount)
                  ).subscribe(() => {
                    this.addBalance(
                      destinationAccount,
                      Number(transfer.amount)
                    ).subscribe(() => {
                      subscriber.next({ status: 'success' });
                    });
                  });
                }
              });
          }
        });
    });
  }

  electronicTransfer(transfer: ElectronicTransfer) {
    console.log(transfer.paymentSystem);
    return new Observable((subscriber) => {
      this.http
        .get<ICard[]>(
          environment.URL +
            `cards?cardNumber=${transfer.fromAccount.cardNumber}`
        )
        .subscribe((acc) => {
          const fromAccount: ICard = acc[0];
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
    return this.http.put(environment.URL + `cards/${card.id}`, card);
  }

  addBalance(card: ICard, amountToAdd: number) {
    card.availableAmount += amountToAdd;
    return this.http.put(environment.URL + `cards/${card.id}`, card);
  }

  postTransactionToDb(
    transfer: ElectronicTransfer | BankTransfer | InstantTransfer
  ) {
    const transferForDb = {
      ...transfer,
      fromAccount: transfer.fromAccount.accountNumber,
    };
    return this.http.post(environment.URL + 'payments', transferForDb);
  }
}
