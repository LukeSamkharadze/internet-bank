import { Component, OnInit } from '@angular/core';
import { NewsItem } from '../models/news-item.entity';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss'],
})
export class SingleNewsComponent implements OnInit {
  article: NewsItem;
  articleSrc: string;
  articleAlt: string;
  articleHeader: string;
  articleReleaseDate: Date;
  articleText: string;
  articleNotFound = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.article = this.newsService.article;
    if (this.article) {
      this.articleReleaseDate = new Date(this.article.publishedAt);
      this.articleSrc = this.article.urlToImage;
      this.articleHeader = this.article.title;
      this.articleText = this.article.content;
      this.articleAlt = 'News article';
    } else {
      this.articleNotFound = true;
    }
  }
}
