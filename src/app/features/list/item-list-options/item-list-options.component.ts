import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ItemListOption } from '../models/item.entity';

@Component({
  selector: 'app-item-list-options',
  templateUrl: './item-list-options.component.html',
  styleUrls: ['./item-list-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListOptionsComponent {
  @Input()
  options: ItemListOption[];

  @Input()
  activeIndex: number;

  @Output()
  activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

  activate(index: number) {
    this.activeIndex = index;
    this.activeIndexChange.emit(index);
  }
}
