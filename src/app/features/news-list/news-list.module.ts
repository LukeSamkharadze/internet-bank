import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared';
import { NewsListComponent } from './news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { DateAgoPipe } from './date-ago.pipe';

@NgModule({
  declarations: [NewsListComponent, NewsItemComponent, DateAgoPipe],
  imports: [CommonModule, SharedModule],
  providers: [],
  exports: [NewsListComponent],
})
export class NewsListModule {}
