import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import IItem from '../models/list-item.interface';

@Component({
  selector: 'app-accounts-list-item',
  templateUrl: './accounts-list-item.component.html',
  styleUrls: ['./accounts-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListItemComponent {
  @Input() info: IItem;
  @Input() color = '';
}
