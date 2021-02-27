import { Component, OnInit } from '@angular/core';
import { NewsArticle } from './models/news-article.interface';
import { NewsService } from './services/news.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  tabNames = ['Latest News', 'Trending News', 'Most Popular'];
  newsArticles: NewsArticle[];

  constructor(public newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService
      .getSingleArticle()
      .pipe(
        map((resp) => {
          this.newsArticles = resp.map((article) => {
            const articleDate = article.releaseDate;
            article.releaseDate = new Date(articleDate);
            return article;
          });
        })
      )
      .subscribe();
  }
}
