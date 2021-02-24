import { Injectable } from '@angular/core';
import { BankTransfer } from '../../../interfaces/bankTransfer.entity';
import { PaymentsGetterService } from '../../../services/paymentsGetter.service';
@Injectable()
export class ArrowDirectionService {
  constructor(public getPayments: PaymentsGetterService) {}
  determineArrow(accNum) {
    const promise = new Promise((resolve, reject) => {
      this.getPayments
        .getByAccountNumber(accNum)
        .subscribe((val: BankTransfer[]) => {
          if (val) {
            const latestPaymentId = Math.max(...val.map((o) => o.id), 0);
            if (val.filter((payment) => payment.id === latestPaymentId)[0]) {
              const lastPaymentAuthor =
                val.filter((payment) => payment.id === latestPaymentId)[0]
                  .fromAccount +
                  '' ===
                accNum;
              resolve(lastPaymentAuthor);
            }
          }
        });
    }).then((res) => {
      if (res) {
        return 'la-arrow-down';
      } else {
        return 'la-long-arrow-alt-up';
      }
    });
    return promise;
  }
}
