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
  cardImg = new Map<string, string>([
    ['VISA CARD', '../../../../assets/features/accounts-list/visa.svg'],
    [
      'MASTER CARD',
      '../../../../assets/features/accounts-list/master-card.svg',
    ],
  ]);

  constructor(public infoService: AccountsListInfoService) {}

  getSrc(card: ICard): string | null {
    return this.cardImg.get(card.cardName) || null;
  }
}
