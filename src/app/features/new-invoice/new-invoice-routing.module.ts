import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewInvoiceComponent } from './new-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: NewInvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewInvoiceRoutingModule {}
