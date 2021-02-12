import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared';
import { NewsListComponent } from './news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { NewsListRoutingModule } from './news-list-routing.module';
import { SingleNewsComponent } from './single-news/single-news.component';

@NgModule({
  declarations: [NewsListComponent, NewsItemComponent, SingleNewsComponent],
  imports: [SharedModule, FeaturesSharedModule, NewsListRoutingModule],
  providers: [],
  exports: [NewsListComponent, SingleNewsComponent],
})
export class NewsListModule {}
