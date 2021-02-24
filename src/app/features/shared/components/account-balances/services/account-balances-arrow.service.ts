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
          const latestPaymentId = Math.max(...val.map((o) => o.id), 0);
          if (val.filter((payment) => payment.id === latestPaymentId)[0]) {
            if (
              val.filter((payment) => payment.id === latestPaymentId)[0]
                .fromAccount +
                '' ===
              accNum
            ) {
              return 'la-arrow-down';
            } else if (
              val.filter((payment) => payment.id === latestPaymentId)[0]
                .destinationAccountNumber +
                '' ===
              accNum
            ) {
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
