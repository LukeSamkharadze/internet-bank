import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { scan, map } from 'rxjs/operators';
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

  constructor(private http: HttpClient, private router: Router) {
    this.getMoreNews = new BehaviorSubject<number>(this.numberOfNews);
    const newsNumberController = this.getMoreNews.pipe(
      scan((previous, current) => previous + current)
    );
    newsNumberController.subscribe((num) => (this.totalNumberOfNews = num));
  }

  getNews(numOfNews: number): Observable<NewsResponse> {
    // 2370d68f7865460280f4eb4f61e4fcba
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=${numOfNews}&apiKey=4d79b03f861e401482765e7950a1b96a`;
    return this.http.get<NewsResponse>(url);
  }
}
