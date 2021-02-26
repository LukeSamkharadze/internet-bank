import { Injectable } from '@angular/core';
import { ICard } from '../../../interfaces/card.interface';
import { IDeposit } from '../../../interfaces/deposit.interface';

import { AuthService } from '../../../services/auth.service';
import { CardService } from '../../../services/card.service';
import { DepositService } from '../../../services/deposit.service';
import { Subject } from 'rxjs';

@Injectable()
export class AccountBalancesService {
  balances$ = new Subject<Array<ICard | IDeposit>>();
  constructor(
    private authService: AuthService,
    private cardService: CardService,
    private depositService: DepositService
  ) {}

  getBalances() {
    this.depositService.getAll().subscribe((deposits) => {
      this.cardService.cards$.subscribe((cards) => {
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
}
