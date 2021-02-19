import { NgModule } from '@angular/core';
import { AccountsListComponent } from './accounts-list.component';
import { AccountsListItemComponent } from './accounts-list-item/accounts-list-item.component';
import { AccountsListChartComponent } from './accounts-list-chart/accounts-list-chart.component';
import { AccountsListChartService } from './services/accounts-list-chart.service';
import { AccountsListRoutingModule } from './accounts-list-routing.module';
import { AccountsListInfoService } from './services/accounts-list-info.service';
import { FeaturesSharedModule } from '../shared';
import { AccountsListCardsComponent } from './accounts-list-cards/accounts-list-cards.component';
import { AccountsListDepositsComponent } from './accounts-list-deposits/accounts-list-deposits.component';
import { AccountsListLoansComponent } from './accounts-list-loans/accounts-list-loans.component';
import { AccountsListIncomeService } from './services/accounts-list-income.service';

@NgModule({
  declarations: [
    AccountsListComponent,
    AccountsListItemComponent,
    AccountsListChartComponent,
    AccountsListCardsComponent,
    AccountsListDepositsComponent,
    AccountsListLoansComponent,
  ],
  imports: [FeaturesSharedModule, AccountsListRoutingModule],
  providers: [
    AccountsListChartService,
    AccountsListInfoService,
    AccountsListIncomeService,
  ],
  exports: [AccountsListComponent],
})
export class AccountsListModule {}
