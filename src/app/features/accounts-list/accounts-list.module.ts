import { NgModule } from '@angular/core';
import { AccountsListComponent } from './accounts-list.component';
import { AccountsListItemComponent } from './accounts-list-item/accounts-list-item.component';
import { AccountsListChartComponent } from './accounts-list-chart/accounts-list-chart.component';
import { AccountsListChartService } from './services/accounts-list-chart.service';
import { AccountsListRoutingModule } from './accounts-list-routing.module';
import { AccountsListInfoService } from './services/accounts-list-info.service';
import { FeaturesSharedModule } from '../shared';

@NgModule({
  declarations: [
    AccountsListComponent,
    AccountsListItemComponent,
    AccountsListChartComponent,
  ],
  imports: [FeaturesSharedModule, AccountsListRoutingModule],
  providers: [AccountsListChartService, AccountsListInfoService],
  exports: [AccountsListComponent],
})
export class AccountsListModule {}
