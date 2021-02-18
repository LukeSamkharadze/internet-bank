import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./features/create-card/create-card.module').then(
        (m) => m.CreateCardModule
      ),
  },
  {
    path: 'accounts-list',
    loadChildren: () =>
      import('./features/accounts-list/accounts-list.module').then(
        (m) => m.AccountsListModule
      ),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./features/list/list.module').then((m) => m.ListModule),
  },
  {
    path: 'payments',
    loadChildren: () =>
      import('./features/payments/payments.module').then(
        (m) => m.PaymentsModule
      ),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
