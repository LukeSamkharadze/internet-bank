import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-progress-bars',
  templateUrl: './progress-bars.component.html',
  styleUrls: ['./progress-bars.component.scss'],
})
export class ProgressBarsComponent implements OnInit {
  public val = 59;
  public max = 100;

  constructor() {}

  ngOnInit(): void {}

  red() {
    return this.val / this.max < 0.26;
  }
  orange() {
    return this.val / this.max >= 0.26 && this.val / this.max < 0.61;
  }
  blue() {
    return this.val / this.max >= 0.61 && this.val / this.max < 0.81;
  }
  green() {
    return this.val / this.max >= 0.81 && this.val / this.max < 1;
  }
}
