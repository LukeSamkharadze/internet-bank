import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent {
  constructor(private newsService: NewsService) {}

  @Input() imgSrc: string;
  @Input() time: Date;
  @Input() articleUrl: string;
  comments = Math.floor(Math.random() * 30); // fake number of comments (idk what to do with them yet)

  // If image url fails
  showPlacehoderImg() {
    this.imgSrc = '../../../../assets/news-list/placeholder-img.png';
  }
}
