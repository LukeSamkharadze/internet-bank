import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentLimitsRoutingModule } from './payment-limits-routing.module';
import { PaymentLimitsComponent } from './payment-limits.component';

@NgModule({
  declarations: [PaymentLimitsComponent],
  imports: [CommonModule, PaymentLimitsRoutingModule],
})
export class PaymentLimitsModule {}
