import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PaymentsGetterService } from '../../services/paymentsGetter.service';
import { ArrowDirectionService } from './services/account-balances-arrow.service';
import { AccountBalancesService } from './services/account-balances.service';
@Component({
  selector: 'app-features-shared-account-balances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss'],
  providers: [AccountBalancesService, ArrowDirectionService],
})
export class AccountBalancesComponent implements OnInit, AfterViewInit {
  constructor(
    public balances: AccountBalancesService,
    public getPayments: PaymentsGetterService,
    private arrowFunction: ArrowDirectionService
  ) {}

  ngOnInit(): void {
    this.balances.getBalances();
  }
  ngAfterViewInit() {
    this.balances.balances$.subscribe((card: Array<any>) => {
      for (const i of card) {
        this.arrowFunction.determineArrow(i.accountNumber).then(() => {
          const index = card.indexOf(i);
          card.splice(index, 1);
          this.arrowFunction
            .determineArrow(i.accountNumber)
            .then((arrowState) => {
              const b = { ...i, arrow: arrowState };
              card.splice(index, 0, b);
            });
        });
      }
    });
  }
}
