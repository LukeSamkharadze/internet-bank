import { NgModule } from '@angular/core';
import { NewsListComponent } from './news-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SingleNewsComponent } from './single-news/single-news.component';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
  },
  {
    path: 'article',
    component: SingleNewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsListRoutingModule {}
