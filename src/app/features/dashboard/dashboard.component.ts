import { Component, OnInit } from '@angular/core';
import { Expanses } from '../shared/interfaces/expanses.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  chartData: Expanses[] = [
    {
      kind: 'Grocery',
      share: 2000,
      colorString: '#FFAB2B',
    },
    {
      kind: 'Health & Wellness',
      share: 1000,
      colorString: '#D28715',
    },
    {
      kind: 'Home Renta;',
      share: 1000,
      colorString: '#D28775',
    },
    {
      kind: 'Transportation',
      share: 1000,
      colorString: '#D28760',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
