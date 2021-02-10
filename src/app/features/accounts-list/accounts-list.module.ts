import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsListComponent } from './accounts-list.component';
import { AccountsListItemComponent } from './accounts-list-item/accounts-list-item.component';
import { AccountsListChartComponent } from './accounts-list-chart/accounts-list-chart.component';
import { AccountsListChartService } from './services/accounts-list-chart.service';

@NgModule({
  declarations: [
    AccountsListComponent,
    AccountsListItemComponent,
    AccountsListChartComponent,
  ],
  imports: [CommonModule],
  providers: [AccountsListChartService],
  exports: [AccountsListComponent],
})
export class AccountsListModule {}
