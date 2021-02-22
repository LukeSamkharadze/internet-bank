import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { take, tap } from 'rxjs/operators';
import { BankTransfer } from '../../interfaces/bankTransfer.entity';
import { ICard } from '../../interfaces/card.interface';
import { PaymentsGetterService } from '../../services/paymentsGetter.service';
import { AccountBalancesService } from './services/account-balances.service';
@Component({
  selector: 'app-features-shared-account-balances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss'],
  providers: [AccountBalancesService],
})
export class AccountBalancesComponent implements OnInit {
  lastPaymentAuthor;
  constructor(
    public balances: AccountBalancesService,
    public getPayments: PaymentsGetterService
  ) {}

  ngOnInit(): void {
    this.balances.getBalanceInfo();
    setTimeout(() => {
      for (let i of this.balances.cards) {
        this.determineArrow(i.accountNumber).then(() => {
          let index = this.balances.cards.indexOf(i);
          this.balances.cards.splice(index, 1);
          let b = {
            ...i,
            arrow: this.determineArrow(i.accountNumber)['__zone_symbol__value'],
          };
          this.balances.cards.splice(index, 0, b);

          console.log(this.balances.cards);
        });
      }
    }, 1000);
  }

  determineArrow(accNum) {
    let promise = new Promise((resolve, reject) => {
      this.getPayments
        .getByAccountNumber(accNum)
        .subscribe((val: BankTransfer[]) => {
          console.log(val);
          const latestPaymentId = Math.max(...val.map((o) => o.id), 0);
          this.lastPaymentAuthor =
            val.filter((payment) => payment.id === latestPaymentId)[0]
              .fromAccount +
              '' ===
            accNum;
          console.log(
            val.filter((payment) => payment.id === latestPaymentId)[0]
              .fromAccount +
              '' ===
              accNum
          );
          resolve(this.lastPaymentAuthor);
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
// setTimeout(() => {
//   for (let i in this.balances.cards) {
//     this.getPayments.getByAccountNumber(this.balances.cards[i].accountNumber).pipe(
//       tap(
//         (response) => {
//           console.log(this.balances.cards[i].accountNumber)
//           console.log(response)
//           if (response[0].fromAccount + '' === this.balances.cards[i].accountNumber) {
//             this.iconName = 'la-long-arrow-alt-down';
//           } else {
//             this.iconName = 'la-long-arrow-alt-up';
//           }
//         }
//       )
//     ).subscribe((value) => {
//       console.log(value)
//     })
//   }
// })
