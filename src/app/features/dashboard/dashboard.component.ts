import { Component } from '@angular/core';
import { Expanses } from '../shared/interfaces/expanses.interface';
import { Spendings } from '../shared/interfaces/spendings.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
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

  spendings: Spendings = {
    debit: 20,
    credit: 40,
    cash: 60,
    maxval: 80,
  };
}
