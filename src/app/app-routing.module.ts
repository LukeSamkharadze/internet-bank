import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { IsLoggedInGuard } from './features/shared/guards/is-logged-in.guard';
import { IsLoggedOutGuard } from './features/shared/guards/is-logged-out.guard';
import { PageNotFoundComponent } from './page-not-found.component';
import { ApplicationComponent } from './features/application/application.component';

const routes: Routes = [
  // Dashboard Paths
  {
    path: '',
    component: ApplicationComponent,
    canActivate: [IsLoggedInGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
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
    ],
  },
  // Authentication Paths
  {
    path: '',
    canActivate: [IsLoggedOutGuard],
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  // All Other Paths
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
