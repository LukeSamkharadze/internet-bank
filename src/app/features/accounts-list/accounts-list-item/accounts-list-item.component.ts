import { Component, Input } from '@angular/core';
import IItem from '../models/list-item.entity';

@Component({
  selector: 'app-accounts-list-item',
  templateUrl: './accounts-list-item.component.html',
  styleUrls: ['./accounts-list-item.component.scss'],
})
export class AccountsListItemComponent {
  @Input() info: IItem;
  @Input() color = '';
}
