import { Component, OnInit } from '@angular/core';
import { PaymentsGetterService } from '../../services/paymentsGetter.service';
import { AccountBalancesService } from './services/account-balances.service';
@Component({
  selector: 'app-features-shared-account-balances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss'],
  providers: [AccountBalancesService],
})
export class AccountBalancesComponent implements OnInit {
  constructor(
    public balances: AccountBalancesService,
    public getPayments: PaymentsGetterService
  ) {}

  ngOnInit(): void {
    this.balances.getBalanceInfo();
  }
  determineArrow(accNum) {
    this.getPayments.getByAccountNumber(accNum).subscribe((val) => {
      console.log(val);
      const latestPaymentId = Math.max(...val.map((o) => o.id), 0);
      const lastPaymentAuthor =
        val.filter((payment) => payment.id === latestPaymentId)[0].fromAccount +
        '';
      if (lastPaymentAuthor === accNum) {
        return 'la-long-arrow-alt-down';
      }
      return 'la-long-arrow-alt-up';
    });
  }
}
