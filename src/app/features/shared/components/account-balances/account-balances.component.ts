import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ICard } from '../../interfaces/card.interface';
import { IDeposit } from '../../interfaces/deposit.interface';
import { CardService } from '../../services/card.service';
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
  balance: Array<ICard | IDeposit>;
  constructor(
    public accountBalancesService: AccountBalancesService,
    public paymentsGetterService: PaymentsGetterService,
    private arrowDirectionService: ArrowDirectionService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.accountBalancesService.getBalances();
  }
  ngAfterViewInit() {
    this.accountBalancesService.balances$.subscribe(
      (wholeBalance: Array<ICard | IDeposit>) => {
        for (const i of wholeBalance) {
          let index;
          let b;
          if (this.instanceOfICard(i)) {
            index = wholeBalance.indexOf(i);
            wholeBalance.splice(index, 1);
            b = {
              ...this.cardService.determineIconPath(i),
              arrow: this.arrowDirectionService.determineArrow(i.accountNumber),
            };
          }
          wholeBalance.splice(index, 0, b);
        }

        this.balance = wholeBalance;
      }
    );
  }
  instanceOfICard(object: any): object is ICard {
    return 'member' in object;
  }
}
