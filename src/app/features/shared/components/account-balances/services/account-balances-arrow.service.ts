import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionService } from '../../../services/transaction.service';
@Injectable()
export class ArrowDirectionService {
  constructor(public transactionService: TransactionService) {}

  determineArrow(accNum: string): Observable<string> {
    return this.transactionService.getByAccountNumber(accNum).pipe(
      map((transactionsArray: any[]) => {
        if (transactionsArray) {
          const lastTransactionId = Math.max(
            ...transactionsArray.map((transaction) => transaction.id)
          );
          const lastTransaction = transactionsArray.find(
            (transaction) => transaction.id === lastTransactionId
          );
          if (lastTransaction) {
            if (lastTransaction.fromAccountNumber + '' === accNum) {
              return 'la-arrow-down';
            } else if (lastTransaction.toAccountNumber + '' === accNum) {
              return 'la-long-arrow-alt-up';
            } else {
              return;
            }
          }
        }
      })
    );
  }
}
