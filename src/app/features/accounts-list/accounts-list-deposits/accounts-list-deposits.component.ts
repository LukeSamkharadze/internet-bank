import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { AccountsListInfoService } from '../services/accounts-list-info.service';

@Component({
  selector: 'app-accounts-list-deposits',
  templateUrl: './accounts-list-deposits.component.html',
  styleUrls: ['../styles/_item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListDepositsComponent {
  @Input() deposits: Array<IDeposit> = [];

  constructor(public infoService: AccountsListInfoService) {}
}
