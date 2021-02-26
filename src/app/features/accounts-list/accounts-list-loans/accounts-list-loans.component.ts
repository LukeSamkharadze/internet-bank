import { Component, Input } from '@angular/core';
import { ILoan } from '../../shared/interfaces/loan.interface';
import { AccountsListInfoService } from '../services/accounts-list-info.service';

@Component({
  selector: 'app-accounts-list-loans',
  templateUrl: './accounts-list-loans.component.html',
  styleUrls: ['../styles/_item.scss'],
})
export class AccountsListLoansComponent {
  @Input() loans: Array<ILoan> = [];
  readonly loanColors = new Map<string, string>([
    ['Mortgage loan', 'green'],
    ['Consumer loan', 'blue'],
  ]);
  readonly loanIcons = new Map<string, string>([
    ['Mortgage loan', 'lar la-building'],
    ['Consumer loan', 'las la-laptop'],
  ]);

  constructor(public infoService: AccountsListInfoService) {}

  getColor(loan: ILoan): string {
    return this.loanColors.get(loan.loanName) || '';
  }

  getIconClass(loan: ILoan): string {
    return this.loanIcons.get(loan.loanName) || 'las la-wallet';
  }
}
