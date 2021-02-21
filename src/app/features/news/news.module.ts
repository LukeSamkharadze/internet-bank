import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared';
import { NewsComponent } from './news.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsService } from './services/news.service';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  declarations: [NewsComponent, NewsItemComponent, NewsListComponent],
  imports: [SharedModule, FeaturesSharedModule, NewsRoutingModule],
  providers: [NewsService],
  exports: [NewsComponent],
})
export class NewsModule {}
