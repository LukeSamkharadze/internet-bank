import { Component, OnInit } from '@angular/core';
import { catchError, concatMap, map, retry, scan, take } from 'rxjs/operators';
import { NewsItem } from './models/news-item.entity';
import { NewsService } from './services/news.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  news: NewsItem[] = [];
  constructor(public newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService
      .getNews(this.newsService.numberOfNews)
      .pipe(
        retry(5),
        map((resp) => {
          if (resp['status'] === 'ok') {
            this.news = resp['articles'];
          } else {
            throw HttpErrorResponse;
          }
        }),
        catchError((err) => err)
      )
      .subscribe();
  }

  displayMore() {
    this.newsService.getMoreNews.next(this.newsService.numberOfNews);
    this.newsService
      .getNews(this.newsService.totalNumberOfNews)
      .pipe(
        retry(2),
        map((resp) => {
          if (resp['status'] === 'ok') {
            this.news = resp['articles'];
          } else {
            throw HttpErrorResponse;
          }
        }),
        catchError((err) => err)
      )
      .subscribe();
  }
}
