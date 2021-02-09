import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-features-shared-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss'],
})
export class NewsArticleComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;
  @Input() header: string;
  @Input() articleReleaseDate: Date;

  dateNum: number;
  dateStr: string;

  ngOnInit(): void {
    this.dates();
  }

  dates() {
    const currentTime = new Date();
    const timeDiffInMS =
      currentTime.getTime() - this.articleReleaseDate.getTime();

    if (timeDiffInMS >= 31579200000) {
      this.culculate(timeDiffInMS, 'Years', 31579200000);
    } else if (timeDiffInMS >= 2.628e9) {
      this.culculate(timeDiffInMS, 'Months', 2.628e9);
    } else if (timeDiffInMS >= 86400000) {
      this.culculate(timeDiffInMS, 'Days', 86400000);
    } else if (timeDiffInMS >= 3600000) {
      this.culculate(timeDiffInMS, 'Hours', 3600000);
    } else if (timeDiffInMS >= 60000) {
      this.culculate(timeDiffInMS, 'Minutes', 60000);
    } else {
      this.dateStr = 'Just now';
      setTimeout(() => {
        this.dates();
      }, 60000);
    }
  }

  culculate(timediff: number, str: string, num: number) {
    this.dateStr = str;
    this.dateNum = Math.floor(timediff / num);
    const timePassed = timediff - this.dateNum * num;
    const delay = num - timePassed;
    console.log(delay, 'vaaa');
    this.repeat(delay);
  }

  repeat(delay: number) {
    if (delay > 2147483647) {
      // Maximum delay value
      delay = 2147483647;
    }
    const ineterval = setInterval(() => {
      this.dates();
      clearInterval(ineterval);
    }, delay);
  }
}
