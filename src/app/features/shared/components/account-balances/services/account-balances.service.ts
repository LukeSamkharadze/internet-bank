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
  balances$ = new Subject();
  constructor(
    private authService: AuthService,
    private cardService: CardService,
    private depositService: DepositService
  ) {}

  getBalances() {
    this.depositService.getAll().subscribe((deposits) => {
      this.getCards().subscribe((cards) => {
        const wholeBalances: Array<ICard | IDeposit> = [
          ...cards,
          ...deposits.filter(
            (depo) => depo.userId + '' === this.authService.userId
          ),
        ];
        this.balances$.next(wholeBalances);
      });
    });
  }
  getCards() {
    return this.cardService.cards$.pipe(map((card) => card));
  }
  determineIconPath(card: ICard): string {
    const cardType = card.cardType;
    switch (cardType) {
      case 'VISA':
        return './assets/create-card/create-card-visa-icon.svg';

      case 'MASTERCARD':
        return './assets/create-card/mastercard-S.svg';

      default:
        return './assets/account-balances/card.png';
    }
  }
}
