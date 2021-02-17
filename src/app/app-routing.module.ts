import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { IsLoggedInGuard } from './features/shared/guards/is-logged-in.guard';
import { IsLoggedOutGuard } from './features/shared/guards/is-logged-out.guard';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './features/authentication/login/login.component';

const routes: Routes = [
  // All Other Paths
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [IsLoggedInGuard],
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./features/create-card/create-card.module').then(
            (m) => m.CreateCardModule
          ),
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
    component: LoginComponent,
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
    canActivate: [IsLoggedOutGuard],
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
