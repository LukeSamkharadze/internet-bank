import { Injectable } from '@angular/core';
import { BankTransfer } from '../../../interfaces/bankTransfer.entity';
import { PaymentsGetterService } from '../../../services/paymentsGetter.service';
@Injectable()
export class ArrowDirectionService {
  constructor(public getPayments: PaymentsGetterService) {}
  lastPaymentAuthor;
  determineArrow(accNum) {
    const promise = new Promise((resolve, reject) => {
      this.getPayments
        .getByAccountNumber(accNum)
        .subscribe((val: BankTransfer[]) => {
          if (val) {
            const latestPaymentId = Math.max(...val.map((o) => o.id), 0);
            if (val.filter((payment) => payment.id === latestPaymentId)[0]) {
              this.lastPaymentAuthor =
                val.filter((payment) => payment.id === latestPaymentId)[0]
                  .fromAccount +
                  '' ===
                accNum;
              resolve(this.lastPaymentAuthor);
            }
          }
        });
    }).then((res) => {
      if (res) {
        return 'la-long-arrow-alt-down';
      } else {
        return 'la-long-arrow-alt-up';
      }
    });
    return promise;
  }
}
