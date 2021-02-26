import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionService } from '../../../services/transaction.service';
@Injectable()
export class ArrowDirectionService {
  
  constructor(public transactionService: TransactionService) {}

  determineArrow(accNum: string): Observable<string> {
    return this.transactionService.getByAccountNumber(accNum).pipe(
      map((val: any[]) => {
        if (val) {
          const arr = val.filter(
            (payment) =>
              payment.fromAccountNumber + '' === accNum ||
              payment.toAccountNumber === accNum
          );
          const lastPayment = arr[arr.length - 1];

          if (lastPayment) {
            if (lastPayment.fromAccountNumber + '' === accNum) {
              return 'la-arrow-down';
            } else if (lastPayment.toAccountNumber + '' === accNum) {
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
