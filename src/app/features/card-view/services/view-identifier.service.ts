import { Injectable } from '@angular/core';
import { BaseHttpInterface } from '@shared/shared';
import IParent from '../../shared/interfaces/parent.interface';
import { CardService } from '../../shared/services/card.service';
import { DepositService } from '../../shared/services/deposit.service';
import { LoanService } from '../../shared/services/loan.service';

@Injectable({
  providedIn: 'root',
})
export class ViewIdentifierService {
  private readonly services = new Map<string, BaseHttpInterface<IParent>>([
    ['card', this.cardService],
    ['deposit', this.depositService],
    ['loan', this.loanService],
  ]);

  constructor(
    private cardService: CardService,
    private depositService: DepositService,
    private loanService: LoanService
  ) {}

  determineService(path: string): BaseHttpInterface<IParent> | null {
    return this.services.get(path);
  }
}
