import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CardService } from '../../services/card.service';
import { DepositService } from '../../services/deposit.service';
import { BalanceStructure } from './models/balanceType';
import { AccountBalancesService } from './services/account-balances.service';
@Component({
  selector: 'app-features-shared-accountBalances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss'],
  providers: [AccountBalancesService],
})
export class AccountBalancesComponent implements OnInit {
  cardHolderId = +this.loggedUser.userId;
  accountDetails: BalanceStructure;
  cards = [];
  constructor(
    private loggedUser: AuthService,
    private cardInfo: CardService,
    private depositInfo: DepositService
  ) {}

  ngOnInit(): void {
    console.log(this.cardHolderId);
    this.cardInfo.subj.subscribe(() => {
      this.getBalanceInfo();
    });
    this.getBalanceInfo();
  }
  getBalanceInfo() {
    this.cardInfo.getAll().subscribe((card) => {
      this.cards = card.filter((card) => card.id === this.cardHolderId);
      console.log(this.cards);
    });
    this.depositInfo.getAll().subscribe((card) => {
      this.cards = [
        ...this.cards,
        ...card.filter((depo) => depo.id === this.cardHolderId),
      ];
      console.log(this.cards);
    });
    this.depositOrCardIcon();
  }
  depositOrCardIcon() {
    for (let i of this.cards) {
      const additionCardInfo = this.cardInfo.determineIconPath(i);
      i = { ...i, ...additionCardInfo };
    }
    return this.cards;
  }
}
