import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentProvidersComponent } from './payments/payment-providers/payment-providers.component';
import { PaymentFormComponent } from './payments/payment-form/payment-form.component';
import { ProvidersService } from './services/providers.service';

@NgModule({
  declarations: [
    PaymentProvidersComponent,
    PaymentFormComponent,
    PaymentsComponent,
  ],
  imports: [CommonModule],
  exports: [PaymentsComponent, PaymentFormComponent, PaymentProvidersComponent],
  providers: [ProvidersService],
})
export class PaymentsModule {}
