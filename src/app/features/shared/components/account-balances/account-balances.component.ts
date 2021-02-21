import { Component, OnInit } from '@angular/core';
import { AccountBalancesService } from './services/account-balances.service';
@Component({
  selector: 'app-features-shared-account-balances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss'],
  providers: [AccountBalancesService],
})
export class AccountBalancesComponent implements OnInit {
  constructor(public balances: AccountBalancesService) {}

  ngOnInit(): void {
    this.balances.getBalanceInfo();
  }
}
