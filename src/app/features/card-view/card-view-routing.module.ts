import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardViewComponent } from './card-view.component';
import { CardDetailsGuard } from './guards/card-details.guard';
import { DepositDetailsGuard } from './guards/deposit-details.guard';
import { LoanDetailsGuard } from './guards/loan-details.guard';

const routes: Routes = [
  {
    path: 'card/:id',
    component: CardViewComponent,
    canActivate: [CardDetailsGuard],
  },
  {
    path: 'deposit/:id',
    component: CardViewComponent,
    canActivate: [DepositDetailsGuard],
  },
  {
    path: 'loan/:id',
    component: CardViewComponent,
    canActivate: [LoanDetailsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardViewRoutingModule {}
