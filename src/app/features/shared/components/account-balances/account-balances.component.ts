import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AccountBalancesService } from './services/account-balances.service';
@Component({
  selector: 'app-features-shared-accountBalances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss'],
  providers: [AccountBalancesService],
})
export class AccountBalancesComponent implements OnInit {
  @Input() cardHolderId: string;
  accountDetails;

  constructor(private http: AccountBalancesService) {}

  ngOnInit(): void {
    this.http.id = this.cardHolderId;
    this.http.BalanceStructures.subscribe(() => {
      this.getBalanceInfo();
    });
    this.getBalanceInfo();
  }
  getBalanceInfo() {
    this.http
      .get()
      .pipe(
        map((balances) => {
          this.accountDetails = balances;
        })
      )
      .subscribe();
  }
}
