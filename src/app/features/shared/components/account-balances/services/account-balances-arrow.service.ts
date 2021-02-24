import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankTransfer } from '../../../interfaces/bankTransfer.entity';
import { PaymentsGetterService } from '../../../services/paymentsGetter.service';
@Injectable()
export class ArrowDirectionService {
  constructor(public paymentsGetterService: PaymentsGetterService) {}
  determineArrow(accNum: string): Observable<string> {
    return this.paymentsGetterService.getByAccountNumber(accNum).pipe(
      map((val: BankTransfer[]) => {
        if (val) {
          const lastPayment = val.filter(
            (payment) =>
              payment.fromAccount + '' === accNum ||
              payment.destinationAccountNumber === accNum
          )[0];
          if (lastPayment) {
            if (lastPayment.fromAccount + '' === accNum) {
              return 'la-arrow-down';
            } else if (lastPayment.destinationAccountNumber + '' === accNum) {
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
