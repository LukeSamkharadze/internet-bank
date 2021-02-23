import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankTransactionsComponent } from './components/bank-transactions/bank-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: BankTransactionsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesSharedRoutingModule {}
