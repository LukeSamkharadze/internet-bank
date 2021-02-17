import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared';
import { NewsListComponent } from './news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { NewsListRoutingModule } from './news-list-routing.module';
import { NewsSingleArticleComponent } from './news-single-article/news-single-article.component';
import { NewsItemListComponent } from './news-item-list/news-item-list.component';

@NgModule({
  declarations: [
    NewsListComponent,
    NewsItemComponent,
    NewsSingleArticleComponent,
    NewsItemListComponent,
  ],
  imports: [SharedModule, FeaturesSharedModule, NewsListRoutingModule],
  providers: [],
  exports: [NewsListComponent, NewsSingleArticleComponent],
})
export class NewsListModule {}
