import { Injectable } from '@angular/core';
import { CardService } from '../../../shared/services/card.service';

@Injectable()
export class GetCardServiceService {
  constructor(private cardService: CardService) {}
  getCards() {
    return this.cardService.getAll();
  }

  formatCardNumber(strnum: string): string {
    return Array(2).fill(' ').join(Array(5).join('*')) + strnum.substr(-4, 4);
  }
}
