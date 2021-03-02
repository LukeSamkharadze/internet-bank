import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentLimitsRoutingModule } from './payment-limits-routing.module';
import { PaymentLimitsComponent } from './payment-limits.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentLimitsSectionComponent } from './payment-limits-section/payment-limits-section.component';
@NgModule({
  declarations: [PaymentLimitsComponent, PaymentLimitsSectionComponent],
  imports: [
    CommonModule,
    PaymentLimitsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class PaymentLimitsModule {}
