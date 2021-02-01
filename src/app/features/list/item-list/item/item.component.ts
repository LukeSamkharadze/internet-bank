import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemEntity } from '../../models/item.entity';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input() item: ItemEntity;
}
