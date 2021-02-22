import { Injectable } from '@angular/core';
import { ICard } from '../../../interfaces/card.interface';
import { IDeposit } from '../../../interfaces/deposit.interface';

import { AuthService } from '../../../services/auth.service';
import { CardService } from '../../../services/card.service';
import { DepositService } from '../../../services/deposit.service';

@Injectable()
export class AccountBalancesService {
  public cards: Array<ICard | IDeposit>;
  constructor(
    private loggedUser: AuthService,
    private cardInfo: CardService,
    private depositInfo: DepositService
  ) {}
  getBalanceInfo() {
    this.getCards();
    this.getDeposits();
  }

  getDeposits() {
    this.depositInfo.getAll().subscribe((card) => {
      this.cards = [
        ...this.cards,
        ...card.filter((depo) => depo.userId === this.loggedUser.userId),
      ];
    });
  }
  getCards() {
    this.cardInfo.getAll().subscribe((card) => {
      this.cards = card.filter(
        (icard) => icard.userId === this.loggedUser.userId
      );
    });
  }
  determineIconPath(card: ICard): string {
    const cardType = card.cardType;
    switch (cardType) {
      case 'VISA':
        return '../../../../.././assets/create-card/create-card-visa-icon.svg';

      case 'MASTERCARD':
        return '../../../../.././assets/create-card/mastercard-S.svg';

      default:
        return './assets/./card.png';
    }
  }
}
