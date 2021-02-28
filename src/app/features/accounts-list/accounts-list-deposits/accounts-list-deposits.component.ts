import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { DepositService } from '../../shared/services/deposit.service';
import IItem from '../models/list-item.interface';
import { AccountsListInfoService } from '../services/accounts-list-info.service';

@Component({
  selector: 'app-accounts-list-deposits',
  templateUrl: './accounts-list-deposits.component.html',
  styleUrls: ['../styles/_item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListDepositsComponent implements OnInit {
  @Input() deposits$: Observable<IDeposit[]>;
  pipedDeposits$: Observable<
    (IDeposit | { color: string; icon: string; info: IItem })[]
  >;

  constructor(
    private infoService: AccountsListInfoService,
    private depositService: DepositService
  ) {}

  ngOnInit(): void {
    this.pipedDeposits$ = this.deposits$.pipe(
      map((deposits) =>
        deposits.map((deposit) => ({
          ...deposit,
          color: this.depositService.determineColor(deposit),
          icon: this.depositService.determineIcon(deposit),
          info: this.infoService.depositToInfo(deposit),
        }))
      )
    );
  }
}
