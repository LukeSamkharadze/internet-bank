import { NgModule } from '@angular/core';
import { InvoiceComponent } from './invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { FeaturesSharedModule } from '@features/shared';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceDetailsModule } from './invoice-details/invoice-details.module';

@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceListComponent,
    CreateInvoiceComponent,
  ],
  imports: [FeaturesSharedModule, InvoiceRoutingModule, InvoiceDetailsModule],
})
export class InvoiceModule {}
