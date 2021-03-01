import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsListComponent } from './accounts-list.component';
import { CreateCardComponent } from '../create-card/create-card.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsListComponent,
    pathMatch: 'full',
  },
  {
    path: 'create-card',
    loadChildren: () =>
      import('../create-card/create-card.module').then(
        (m) => m.CreateCardModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsListRoutingModule {}
