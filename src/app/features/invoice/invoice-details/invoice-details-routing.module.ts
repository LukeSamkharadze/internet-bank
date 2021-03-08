import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicePrintComponent } from './invoice-print/invoice-print.component';

const routes: Routes = [{ path: 'print', component: InvoicePrintComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceDetailsRoutingModule {}
