import { NgModule } from '@angular/core';
import { FeaturesSharedModule } from '@features/shared';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';

@NgModule({
  imports: [
    FeaturesSharedModule,
    TransactionsRoutingModule
  ],
  declarations: [TransactionsComponent]
})
export class TransactionsModule { }
