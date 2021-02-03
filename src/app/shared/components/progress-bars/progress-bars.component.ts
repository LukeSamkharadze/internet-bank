import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bars',
  templateUrl: './progress-bars.component.html',
  styleUrls: ['./progress-bars.component.scss'],
})
export class ProgressBarsComponent implements OnInit {
  public val = 59;
  public max = 100;

  constructor() {}

  ngOnInit(): void {}
}
