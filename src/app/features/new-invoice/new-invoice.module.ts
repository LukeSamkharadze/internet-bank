import { NgModule } from '@angular/core';
import { NewInvoiceComponent } from './new-invoice.component';
import { NewInvoiceRoutingModule } from './new-invoice-routing.module';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { SideInfoComponent } from './side-info/side-info.component';

@NgModule({
  declarations: [NewInvoiceComponent, SideInfoComponent],
  imports: [NewInvoiceRoutingModule, FeaturesSharedModule],
  exports: [NewInvoiceComponent],
})
export class NewInvoiceModule {}
