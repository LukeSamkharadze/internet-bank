import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
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
  screenHeight: number;
  screenWidth: number;
  private subscription: Subscription;

  constructor(
    public accountBalancesService: AccountBalancesService,
    public transactionService: TransactionService,
    private arrowDirectionService: ArrowDirectionService,
    private formatterService: FormatterService
  ) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.accountBalancesService.getBalances();
  }

  ngAfterViewInit() {
    this.subscription = this.accountBalancesService.balances$.subscribe(
      (wholeBalance: any[]) => {
        for (const i of wholeBalance) {
          const index = wholeBalance.indexOf(i);
          wholeBalance.splice(index, 1);
          const balance = {
            ...i,
            totalAmount: this.formatterService.formatBalance(
              i.availableAmount,
              {
                currency: '$',
              }
            ),
            arrow: this.arrowDirectionService.determineArrow(i.accountNumber),
          };
          balance.cardNumber
            ? (balance.type = 'card')
            : (balance.type = 'deposit');

          wholeBalance.splice(index, 0, balance);
        }

        this.balance = wholeBalance;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
}
