import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { retry, scan } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NewsItem } from '../models/news-item.interface';
import { NewsResponse } from '../models/news-item.interface';
import { NewsArticle } from '../models/news-article.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  news: Observable<NewsItem[]>;
  getMoreNews: Subject<number>;
  totalNumberOfNews = 0;
  numberOfNews = 10;
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
    const apiKey = environment.NewsApi.apiKey[1];
    const url = `${environment.NewsApi.Url}/${sortBy}&language=en&pageSize=${numOfNews}&apiKey=${apiKey}`;
    return this.http.get<NewsResponse>(url).pipe(retry(2));
  }

  // get data for news-article
  getSingleArticle(): Observable<NewsArticle[]> {
    const url = `${environment.BaseUrl}news`;
    return this.http.get<NewsArticle[]>(url);
  }
}
