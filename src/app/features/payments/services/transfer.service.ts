import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankTransfer } from '../../shared/interfaces/bankTransfer.entity';
import { ElectronicTransfer } from '../../shared/interfaces/electronicTransfer.entity';
import { InstantTransfer } from '../../shared/interfaces/instantTransfer.entity';
import { environment } from '../../../../environments/environment.prod';
import { ICard } from '../../shared/interfaces/card.interface';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { CardService } from '../../shared/services/card.service';

@Injectable()
export class TransferService {
  constructor(private http: HttpClient, private cardService: CardService) {}

  currentUsersCards$ = this.cardService.cards$;

  bankOrInstantTransfer(transfer: BankTransfer | InstantTransfer) {
    return this.cardService
      .getCardByCardNumber(transfer.fromAccount.cardNumber)
      .pipe(
        tap((card) => {
          if (card.availableAmount < transfer.amount) {
            throw new Error('not enough balance');
          }
        }),
        switchMap((card) =>
          forkJoin([
            of(card),
            this.cardService.getCardByAccountNumber(
              transfer.destinationAccountNumber
            ),
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
    return this.cardService
      .getCardByCardNumber(transfer.fromAccount.cardNumber)
      .pipe(
        tap((card) => {
          if (card.availableAmount < transfer.amount) {
            throw new Error('not enough balance');
          }
        }),
        switchMap((fromAccount) =>
          this.removeBalance(fromAccount, Number(transfer.amount))
        )
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
    const transferForDb = {
      ...transfer,
      fromAccount: transfer.fromAccount.accountNumber,
    };
    return this.http.post(environment.BaseUrl + 'payments', transferForDb);
  }
}
