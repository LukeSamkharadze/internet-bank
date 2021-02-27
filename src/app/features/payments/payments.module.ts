import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentProvidersComponent } from './payments/payment-providers/payment-providers.component';
import { ProvidersService } from './services/providers.service';
import { PaymentsRoutingModule } from './payments-routing.module';
import { ElectronicPaymentFormComponent } from './payments/form-components/electronic-payment-form/electronic-payment-form.component';
import { BankTransferFormComponent } from './payments/form-components/bank-transfer-form/bank-transfer-form.component';
import { InstantTransferFormComponent } from './payments/form-components/instant-transfer-form/instant-transfer-form.component';
import { SharedModule } from '../../shared';
import { PaymentService } from './services/payment.service';

@NgModule({
  declarations: [
    PaymentProvidersComponent,
    PaymentsComponent,
    ElectronicPaymentFormComponent,
    BankTransferFormComponent,
    InstantTransferFormComponent,
  ],
  imports: [CommonModule, PaymentsRoutingModule, SharedModule],
  exports: [PaymentsComponent],
  providers: [ProvidersService, PaymentService],
})
export class PaymentsModule {}
