import { Component, Input } from '@angular/core';
import { ICard } from '../../shared/interfaces/card.interface';
import { AccountsListInfoService } from '../services/accounts-list-info.service';

@Component({
  selector: 'app-accounts-list-cards',
  templateUrl: './accounts-list-cards.component.html',
  styleUrls: ['./accounts-list-cards.component.scss'],
})
export class AccountsListCardsComponent {
  @Input() cards: Array<ICard> = [];

  constructor(public infoService: AccountsListInfoService) {}
}
