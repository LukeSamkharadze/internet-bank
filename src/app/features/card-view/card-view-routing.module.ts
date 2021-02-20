import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardViewComponent } from './card-view.component';

const routes: Routes = [
  {
    path: 'card/:id',
    component: CardViewComponent,
  },
  {
    path: 'deposit/:id',
    component: CardViewComponent,
  },
  {
    path: 'loan/:id',
    component: CardViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardViewRoutingModule {}
