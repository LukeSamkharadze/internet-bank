import { NgModule } from '@angular/core';
import { NewInvoiceComponent } from './new-invoice.component';
import { NewInvoiceRoutingModule } from './new-invoice-routing.module';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { SideInfoComponent } from './side-info/side-info.component';
import { FormInvoiceDetailsComponent } from './form-invoice-details/form-invoice-details.component';
import { FormProductsListComponent } from './form-products-list/form-products-list.component';

@NgModule({
  declarations: [
    NewInvoiceComponent,
    SideInfoComponent,
    FormInvoiceDetailsComponent,
    FormProductsListComponent,
  ],
  imports: [NewInvoiceRoutingModule, FeaturesSharedModule],
  exports: [NewInvoiceComponent],
})
export class NewInvoiceModule {}
