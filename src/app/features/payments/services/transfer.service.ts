import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { ICard } from '../../shared/interfaces/card.interface';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CardService } from '../../shared/services/card.service';
import { BankTransfer } from '../../shared/interfaces/transfers/bankTransfer.interface';
import { InstantTransfer } from '../../shared/interfaces/transfers/instantTransfer.interface';
import { ElectronicTransfer } from '../../shared/interfaces/transfers/electronicTransfer.interface';

@Injectable()
export class TransferService {
  constructor(private http: HttpClient, private cardService: CardService) {}

  currentUsersCards$ = this.cardService.cards$;

  bankOrInstantTransfer(transfer: BankTransfer | InstantTransfer) {
    // payments limitsze checki daemateba roca damerjaven masterze.
    return this.cardService
      .getCardByCardNumber(transfer.fromAccountNumber)
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
        }),
        switchMap(([fromAccount, destinationAccount]) => {
          return forkJoin([
            this.removeBalance(fromAccount, Number(transfer.amount)),
            this.addBalance(destinationAccount, Number(transfer.amount), true),
            of(destinationAccount),
          ]);
        }),
        map(([rb, ab, destinationAccount]) => destinationAccount.userId)
      );
  }

  electronicTransfer(transfer: ElectronicTransfer) {
    // transfers limitsze checki daemateba roca damerjaven masterze.
    return new Observable((subscriber) => {
      this.cardService
        .getCardByCardNumber(transfer.fromAccountNumber)
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
      fromAccount: transfer.fromAccountNumber,
    };
    return this.http.post(environment.BaseUrl + 'transfers', transferForDb);
  }
}
