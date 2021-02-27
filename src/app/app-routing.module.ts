import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './features/shared/guards/is-logged-in.guard';
import { IsLoggedOutGuard } from './features/shared/guards/is-logged-out.guard';
import { PageNotFoundComponent } from './page-not-found.component';
import { ApplicationComponent } from './features/application/application.component';
import { DetailsGuard } from './features/card-view/guards/details.guard';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    canActivate: [IsLoggedInGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./features/transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/create-card/create-card.module').then(
            (m) => m.CreateCardModule
          ),
      },
      {
        path: 'card-view',
        loadChildren: () =>
          import('./features/card-view/card-view.module').then(
            (m) => m.CardViewModule
          ),
        canLoad: [DetailsGuard],
      },
      {
        path: 'accounts-list',
        loadChildren: () =>
          import('./features/accounts-list/accounts-list.module').then(
            (m) => m.AccountsListModule
          ),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./features/news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./features/list/list.module').then((m) => m.ListModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings-and-menu/settings-and-menu.module').then(
            (m) => m.SettingsAndMenuModule
          ),
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./features/payments/payments.module').then(
            (m) => m.PaymentsModule
          ),
      },
      {
        path: 'new-invoice',
        loadChildren: () =>
          import('./features/new-invoice/new-invoice.module').then(
            (m) => m.NewInvoiceModule
          ),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./features/invoice/invoice.module').then(
            (m) => m.InvoiceModule
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [IsLoggedOutGuard],
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./features/list/list.module').then((m) => m.ListModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
