import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardViewComponent } from './card-view.component';
import { DetailsGuard } from './guards/details.guard';

const routes: Routes = [
  {
    path: 'card/:id',
    component: CardViewComponent,
    canActivate: [DetailsGuard],
  },
  {
    path: 'deposit/:id',
    component: CardViewComponent,
    canActivate: [DetailsGuard],
  },
  {
    path: 'loan/:id',
    component: CardViewComponent,
    canActivate: [DetailsGuard],
  },
  {
    path: '**',
    redirectTo: '/accounts-list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardViewRoutingModule {}
