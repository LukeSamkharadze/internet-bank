import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-features-shared-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss'],
})
export class NewsArticleComponent implements OnInit, OnDestroy {
  @Input() src: string;
  @Input() alt: string;
  @Input() header: string;
  @Input() articleReleaseDate: Date;

  dateNum: number;
  dateStr: string;
  interval: any;

  ngOnInit(): void {
    this.choosingTimePeriod();
  }

  choosingTimePeriod() {
    const currentTime = new Date();
    const timeDiffInMS =
      currentTime.getTime() - this.articleReleaseDate.getTime();

    if (timeDiffInMS >= 31579200000) {
      this.calculateTimediff(timeDiffInMS, 31579200000, 'Years');
    } else if (timeDiffInMS >= 2.628e9) {
      this.calculateTimediff(timeDiffInMS, 2.628e9, 'Months');
    } else if (timeDiffInMS >= 86400000) {
      this.calculateTimediff(timeDiffInMS, 86400000, 'Days');
    } else if (timeDiffInMS >= 3600000) {
      this.calculateTimediff(timeDiffInMS, 3600000, 'Hours');
    } else if (timeDiffInMS >= 120000) {
      this.calculateTimediff(timeDiffInMS, 60000, 'Minutes');
    } else if (timeDiffInMS >= 60000) {
      this.calculateTimediff(timeDiffInMS, 60000, 'Minute');
    } else {
      this.calculateTimediff(timeDiffInMS, 60000, 'Just now');
    }
  }

  calculateTimediff(
    timediff: number,
    periodDuration: number,
    PeriodName: string
  ) {
    this.dateStr = PeriodName;
    this.dateNum = Math.floor(timediff / periodDuration);
    const timeRemainder = timediff - this.dateNum * periodDuration;
    const delay = periodDuration - timeRemainder;
    this.repeat(delay);
  }

  repeat(delay: number) {
    if (delay > 2147483647) {
      // Maximum delay value
      delay = 2147483647;
    }
    this.interval = setInterval(() => {
      clearInterval(this.interval);
      this.choosingTimePeriod();
    }, delay);
  }

  // If image url fails
  showPlacehoderImg() {
    this.src = 'assets/news-list/placeholder-img.png';
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
