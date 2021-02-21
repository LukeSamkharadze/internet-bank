import { Component, OnInit } from '@angular/core';
import { BalanceStructure } from './models/balanceType';
import { AccountBalancesService } from './services/account-balances.service';
@Component({
  selector: 'app-features-shared-accountBalances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss'],
  providers: [AccountBalancesService],
})
export class AccountBalancesComponent implements OnInit {
  accountDetails: BalanceStructure;
  balanceDetails = [];
  constructor(public balances: AccountBalancesService) {}

  ngOnInit(): void {
    this.balances.getBalanceInfo();
  }
}
