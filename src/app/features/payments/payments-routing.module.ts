import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { ElectronicPaymentFormComponent } from './payments/form-components/electronic-payment-form/electronic-payment-form.component';
import { BankTransferFormComponent } from './payments/form-components/bank-transfer-form/bank-transfer-form.component';
import { InternalTransferFormComponent } from './payments/form-components/internal-transfer-form/internal-transfer-form.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent,
    children: [
      {
        path: 'electronic-payment',
        component: ElectronicPaymentFormComponent,
      },
      {
        path: 'bank-transfer',
        component: BankTransferFormComponent,
      },
      {
        path: 'instant-transfer',
        component: InternalTransferFormComponent,
      },
      {
        path: '',
        redirectTo: 'electronic-payment',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsRoutingModule {}
