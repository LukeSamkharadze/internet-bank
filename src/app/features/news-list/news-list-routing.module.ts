import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news-list.component';
import { NewsSingleArticleComponent } from './news-single-article/news-single-article.component';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
  },
  {
    path: 'article',
    component: NewsSingleArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsListRoutingModule {}
