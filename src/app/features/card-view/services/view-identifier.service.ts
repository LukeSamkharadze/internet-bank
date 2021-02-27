import { Injectable } from '@angular/core';
import { BaseHttpInterface } from '@shared/shared';
import IParent from '../../shared/interfaces/parent.interface';
import { CardService } from '../../shared/services/card.service';
import { DepositService } from '../../shared/services/deposit.service';
import { LoanService } from '../../shared/services/loan.service';

type IView = 'card' | 'loan' | 'deposit';
const VIEW_TYPES = ['card', 'loan', 'deposit'];

@Injectable({
  providedIn: 'root',
})
export class ViewIdentifierService {
  private readonly services: Map<IView, BaseHttpInterface<IParent>>;

  constructor(
    private cardService: CardService,
    private depositService: DepositService,
    private loanService: LoanService
  ) {
    this.services = new Map<IView, BaseHttpInterface<IParent>>([
      ['card', this.cardService],
      ['deposit', this.depositService],
      ['loan', this.loanService],
    ]);
  }

  detemineService(path: string): BaseHttpInterface<IParent> | null {
    if (!this.isViewName(path)) {
      return null;
    }
    return this.services.get(path);
  }

  isViewName(path: string): path is IView {
    return VIEW_TYPES.includes(path);
  }
}
