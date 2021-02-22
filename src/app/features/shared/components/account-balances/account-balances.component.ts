import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { tick } from '@angular/core/testing';
import { take, tap } from 'rxjs/operators';
import { BankTransfer } from '../../interfaces/bankTransfer.entity';
import { ICard } from '../../interfaces/card.interface';
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
  lastPaymentAuthor;
  constructor(
    public balances: AccountBalancesService,
    public getPayments: PaymentsGetterService,
    private getArrow: ArrowDirectionService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.balances.getBalanceInfo();
    setTimeout(() => {
      for (const i of this.balances.cards) {
        this.getArrow.determineArrow(i.accountNumber).then(() => {
          const index = this.balances.cards.indexOf(i);
          this.balances.cards.splice(index, 1);
          this.getArrow
            .determineArrow(i.accountNumber)
            .then((arrowDirection) => {
              const b = { ...i, arrow: arrowDirection };
              this.balances.cards.splice(index, 0, b);
            });
          console.log(this.balances.cards);
        });
      }
    }, 2000);
  }
}
