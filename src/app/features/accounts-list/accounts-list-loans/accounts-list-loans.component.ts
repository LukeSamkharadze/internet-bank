import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILoan } from '../../shared/interfaces/loan.interface';
import { LoanService } from '../../shared/services/loan.service';
import IItem from '../models/list-item.entity';
import { AccountsListInfoService } from '../services/accounts-list-info.service';

@Component({
  selector: 'app-accounts-list-loans',
  templateUrl: './accounts-list-loans.component.html',
  styleUrls: ['../styles/_item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListLoansComponent implements OnInit {
  @Input() loans$: Observable<ILoan[]>;
  pipedLoans$: Observable<
    (ILoan | { color: string; icon: string; info: IItem })[]
  >;

  constructor(
    private infoService: AccountsListInfoService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.pipedLoans$ = this.loans$.pipe(
      map((loans) =>
        loans.map((loan) => ({
          ...loan,
          color: this.loanService.determineColor(loan),
          icon: this.loanService.determineIcon(loan),
          info: this.infoService.loanToInfo(loan),
        }))
      )
    );
  }
}
