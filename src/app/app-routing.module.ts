import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings-and-menu/settings-and-menu.module').then(
        (m) => m.SettingsAndMenuModule
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
    path: 'list',
    loadChildren: () =>
      import('./features/list/list.module').then((m) => m.ListModule),
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
