import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemEntity, ListStyleEnum } from '../models/item.entity';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent {
  @Input() items: ItemEntity[];
  @Input() listStyle: ListStyleEnum;

  trackBy(index: number, item: ItemEntity) {
    return item.id;
  }
}
