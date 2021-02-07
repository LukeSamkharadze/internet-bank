import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BalanceStructure } from './models/balanceType';
import { AccountBalancesService } from './services/account-balances.service';
@Component({
  selector: 'app-features-shared-accountBalances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss'],
  providers: [AccountBalancesService],
})
export class AccountBalancesComponent implements OnInit {
  accountDetails: BalanceStructure[];

  constructor(private http: AccountBalancesService) {}

  ngOnInit(): void {
    this.http._BalanceStructures.subscribe(() => {
      this.getBalanceInfo();
    });
    this.getBalanceInfo();
  }
  getBalanceInfo() {
    this.http
      .get()
      .pipe(
        map((balances: any) => {
          this.accountDetails = [...balances];
        })
      )
      .subscribe();
  }
}
