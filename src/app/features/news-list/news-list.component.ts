import { Component, OnInit } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
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
  totalResults = 0;
  showLearnMore = false;
  noNewsToDisplay = false;
  constructor(public newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService
      .getNews(this.newsService.numberOfNews)
      .pipe(
        retry(5),
        map((resp) => {
          if (resp?.status === 'ok') {
            this.news = resp?.articles;
            this.totalResults = resp.totalResults;
            this.showLearnMore = true;
          } else {
            throw HttpErrorResponse;
          }
        }),
        catchError((err) => {
          this.noNewsToDisplay = true;
          return err;
        })
      )
      .subscribe();
  }

  displayMore() {
    this.newsService.getMoreNews.next(this.newsService.numberOfNews);
    if (this.newsService.totalNumberOfNews >= this.totalResults) {
      this.showLearnMore = false;
    }
    this.newsService
      .getNews(this.newsService.totalNumberOfNews)
      .pipe(
        retry(2),
        map((resp) => {
          if (resp.status === 'ok') {
            this.news = resp.articles;
          } else {
            throw HttpErrorResponse;
          }
        }),
        catchError((err) => {
          this.showLearnMore = false;
          this.noNewsToDisplay = true;
          return err;
        })
      )
      .subscribe();
  }
}
