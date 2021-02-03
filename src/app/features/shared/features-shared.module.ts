import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankTransactionDetailsComponent } from './bank-transaction-details/bank-transaction-details.component';

@NgModule({
  declarations: [BankTransactionDetailsComponent],
  imports: [CommonModule],
  exports: [BankTransactionDetailsComponent],
})
export class FeaturesSharedModule {}
