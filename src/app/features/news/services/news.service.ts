import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NewsItem } from '../models/news-item.entity';
import { NewsResponse } from '../models/news-response.entity';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  news: Observable<NewsItem[]>;
  getMoreNews: Subject<number>;
  totalNumberOfNews = 0;
  numberOfNews = 5;
  article: NewsItem;

  constructor(private http: HttpClient) {
    this.getMoreNews = new BehaviorSubject<number>(this.numberOfNews);
    const newsNumberController = this.getMoreNews.pipe(
      scan((previous, current) => previous + current)
    );
    newsNumberController.subscribe((num) => (this.totalNumberOfNews = num));
  }

  // get news from NewsApi
  getNews(numOfNews: number, typeOfNews: string): Observable<NewsResponse> {
    const sortBy =
      typeOfNews === 'Latest News'
        ? 'everything?sortBy=publishedAt&q=business'
        : typeOfNews === 'Trending News'
        ? 'top-headlines?country=us&category=business'
        : 'everything?sortBy=popularity&q=business';
    const apiKey = environment.NewsApi.apiKey[0];
    const url = `${environment.NewsApi.Url}/${sortBy}&language=en&pageSize=${numOfNews}&apiKey=${apiKey}`;
    return this.http.get<NewsResponse>(url);
  }
}
