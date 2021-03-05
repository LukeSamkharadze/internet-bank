import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoicePrintComponent } from './invoice-print/invoice-print.component';
import { SharedModule } from '@shared/shared';

@NgModule({
  declarations: [InvoiceDetailsComponent, InvoicePrintComponent],
  imports: [CommonModule, InvoiceDetailsRoutingModule, SharedModule],
  exports: [InvoiceDetailsComponent],
})
export class InvoiceDetailsModule {}
