import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BalanceStructure } from './services/balanceType';
import { HttpService } from './services/http.service';
@Component({
  selector: 'app-features-shared-accountBalances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss'],
})
export class AccountBalancesComponent implements OnInit {
  accountDetails: BalanceStructure[];

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http._EmpStructures.subscribe(() => {
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
          console.log(balances);
        })
      )
      .subscribe();
  }
}
