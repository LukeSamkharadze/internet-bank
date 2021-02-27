import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent {
  @Input() imgSrc: string;
  @Input() time: Date;
  @Input() articleUrl: string;
  comments = Math.floor(Math.random() * 30); // fake number of comments

  // If image url fails
  showPlacehoderImg() {
    this.imgSrc = 'assets/news-list/placeholder-img.png';
  }

  // open article in a new window
  openNewsArticle() {
    window.open(this.articleUrl, '_blank');
  }
}
