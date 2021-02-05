import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-progress-bars',
  templateUrl: './progress-bars.component.html',
  styleUrls: ['./progress-bars.component.scss'],
})
export class ProgressBarsComponent implements OnInit {
  @Input()
  public value = 0;

  @Input()
  public max = 100;

  constructor() {}

  ngOnInit(): void {}

  red() {
    return this.value / this.max < 0.26;
  }
  orange() {
    return this.value / this.max >= 0.26 && this.value / this.max < 0.61;
  }
  blue() {
    return this.value / this.max >= 0.61 && this.value / this.max < 0.81;
  }
  green() {
    return this.value / this.max >= 0.81 && this.value / this.max < 1;
  }
}
