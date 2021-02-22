import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { PaymentLimitsRoutingModule } from './payment-limits-routing.module';
import { PaymentLimitsComponent } from './payment-limits.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentLimitsSectionComponent } from './payment-limits-section/payment-limits-section.component';
import { PaymentLimitsService } from './payment-limits.service';
import { PaymentsGetterService } from '../shared/services/paymentsGetter.service';
@NgModule({
  declarations: [PaymentLimitsComponent, PaymentLimitsSectionComponent],
  imports: [
    CommonModule,
    PaymentLimitsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [CurrencyPipe, PaymentLimitsService, PaymentsGetterService],
})
export class PaymentLimitsModule {}
