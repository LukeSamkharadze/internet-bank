import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ICardTemplate from './models/card-view-card.entity';
import IList from './models/card-view-list.entity';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardViewComponent implements OnInit {
  cardInfo: ICardTemplate = [
    {
      title: 'Card number',
      value: '3400  5678  9804  3002',
    },
    [
      {
        title: 'Cardholder',
        value: 'Barry Armstrong',
      },
      {
        title: 'Valid',
        value: '06 / 22',
      },
    ],
  ];

  list: IList = [
    {
      title: 'Card name',
      value: 'Visa Classic Paywave',
    },
    {
      title: 'Account number',
      value: 'UK64CT00000000000010034567',
    },
    {
      title: 'Card number',
      value: '3400 **** **** 3002',
    },
    {
      title: 'Cardholder',
      value: 'Barry Armstrong',
    },
    {
      title: 'Expiration date',
      value: '20.06.2022',
    },
    {
      title: 'Available amount',
      value: '142.800 USD',
    },
    {
      title: '3D Security',
      value: 'Enable',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
