import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
  {
    path: 'article',
    component: NewsArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsListRoutingModule {}
