import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentLimitsComponent } from './payment-limits.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentLimitsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentLimitsRoutingModule {}
