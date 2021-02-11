import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/authentication/login/login.component';
import { CreateCardComponent } from './features/create-card/create-card.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },

  {
    path: 'auth/logedin',
    component: DashboardComponent,
    children: [{ path: 'zdarova', component: CreateCardComponent }],
  },
  // {
  //   path: 'auth/recover',
  //   loadChildren: () =>
  //     import('./features/create-card/create-card.module').then(
  //       (m) => m.CreateCardModule
  //     ),
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./features/create-card/create-card.module').then(
  //       (m) => m.CreateCardModule
  //     ),
  // },
  // {
  //   path: 'list',
  //   loadChildren: () =>
  //     import('./features/list/list.module').then((m) => m.ListModule),
  // },
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
