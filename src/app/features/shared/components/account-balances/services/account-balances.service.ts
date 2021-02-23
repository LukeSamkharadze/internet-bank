import { Injectable } from '@angular/core';
import { ICard } from '../../../interfaces/card.interface';
import { IDeposit } from '../../../interfaces/deposit.interface';

import { AuthService } from '../../../services/auth.service';
import { CardService } from '../../../services/card.service';
import { DepositService } from '../../../services/deposit.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class AccountBalancesService {
  public cards: Array<ICard | IDeposit>;
  sub$ = new Subject();
  constructor(
    private loggedUser: AuthService,
    private cardInfo: CardService,
    private depositInfo: DepositService
  ) {}

  getBalances() {
    this.depositInfo.getAll().subscribe((card) => {
      this.getCards().subscribe((c) => {
        this.cards = [
          ...c,
          ...card.filter((depo) => depo.userId + '' === this.loggedUser.userId),
        ];
        this.sub$.next(this.cards);
      });
    });
  }
  getCards() {
    return this.cardInfo.getAll().pipe(
      map((card) => {
        return card.filter((icard) => icard.userId === this.loggedUser.userId);
      })
    );
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
