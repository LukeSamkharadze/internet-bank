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
      colorString: '#3ce65e',
    },
    {
      kind: 'Health & Wellness',
      share: 1000,
      colorString: '#ffdc7d',
    },
    {
      kind: 'Home Rent',
      share: 1000,
      colorString: '#f29857',
    },
    {
      kind: 'Transportation',
      share: 1000,
      colorString: '#ed413b',
    },
  ];

  spendings: Spendings = {
    debit: 20,
    credit: 40,
    cash: 60,
    maxval: 80,
  };
}
