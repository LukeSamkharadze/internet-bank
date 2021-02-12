import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss'],
})
export class SingleNewsComponent implements OnInit {
  articleSrc: string;
  articleAlt: string;
  articleHeader: string;
  articleReleaseDate: Date;
  articleText: string;
  articleNotFound = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    if (this.newsService.article) {
      this.articleReleaseDate = new Date(this.newsService.article.publishedAt);
      this.articleSrc = this.newsService.article.urlToImage;
      this.articleHeader = this.newsService.article.title;
      this.articleText = this.newsService.article.content;
      this.articleAlt = 'News article';
    } else {
      this.articleNotFound = true;
    }
  }
}
