import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { FeaturesSharedModule } from '@features/shared';
import { InvoiceRoutingModule } from './invoice-routing/invoice-routing.module';

@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceListComponent,
    CreateInvoiceComponent,
  ],
  imports: [CommonModule, FeaturesSharedModule, InvoiceRoutingModule],
})
export class InvoiceModule {}
