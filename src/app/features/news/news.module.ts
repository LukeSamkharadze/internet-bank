import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared';
import { NewsComponent } from './news.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { NewsListRoutingModule } from './news-routing.module';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsListComponent } from './news-list/news-list.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewsItemComponent,
    NewsArticleComponent,
    NewsListComponent,
  ],
  imports: [SharedModule, FeaturesSharedModule, NewsListRoutingModule],
  exports: [NewsComponent, NewsArticleComponent],
})
export class NewsListModule {}
