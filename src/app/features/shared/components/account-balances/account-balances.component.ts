import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ICard } from '../../interfaces/card.interface';
import { IDeposit } from '../../interfaces/deposit.interface';
import { FormatterService } from '../../services/formatter.service';

import { TransactionService } from '../../services/transaction.service';
import { ArrowDirectionService } from './services/account-balances-arrow.service';
import { AccountBalancesService } from './services/account-balances.service';
@Component({
  selector: 'app-features-shared-account-balances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss'],
  providers: [AccountBalancesService, ArrowDirectionService],
})
export class AccountBalancesComponent
  implements OnInit, AfterViewInit, OnDestroy {
  balance: Array<ICard | IDeposit>;
  constructor(
    public accountBalancesService: AccountBalancesService,
    public transactionService: TransactionService,
    private arrowDirectionService: ArrowDirectionService,
    private formatterService: FormatterService
  ) {}

  ngOnInit(): void {
    this.accountBalancesService.getBalances();
  }

  ngAfterViewInit() {
    this.accountBalancesService.balances$.subscribe((wholeBalance: any[]) => {
      for (const i of wholeBalance) {
        const index = wholeBalance.indexOf(i);
        wholeBalance.splice(index, 1);
        const balance = {
          ...i,
          totalAmount: this.formatterService.formatBalance(i.availableAmount, {
            currency: '$',
          }),
          arrow: this.arrowDirectionService.determineArrow(i.accountNumber),
        };

        wholeBalance.splice(index, 0, balance);
      }

      this.balance = wholeBalance;
    });
  }

  ngOnDestroy() {
    this.accountBalancesService.balances$.unsubscribe();
  }
}
