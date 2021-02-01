import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ItemEntity } from './models/item.entity';
import { ItemService } from './services/item.service';
import { map } from 'rxjs/operators';
import { ItemListOptionsService } from './services/item-list-options.service';
import { ItemListOption } from './models/item-list-option.entity';
import { ListStyleEnum } from './models/list-style.enum';
import { generateGuid } from '@shared/shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  itemListOptions: ItemListOption[] = this.itemListOptionsService.getItemListOptions();
  items$: Observable<ItemEntity[]> = this.itemService.getItems();
  optionActiveIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.itemListOptionsService.getDefaultIndex(),
  );
  listStyle$: BehaviorSubject<ListStyleEnum> = new BehaviorSubject<ListStyleEnum>(this.itemListOptionsService.getDefaultClassName());
  uniqueGuide = generateGuid();

  vm$ = combineLatest([
    this.items$,
    this.optionActiveIndex$,
    this.listStyle$,
  ]).pipe(
    map(([items, optionActiveIndex, listStyle]) => ({
      items,
      optionActiveIndex,
      listStyle,
    })),
  );

  constructor(
    private itemService: ItemService,
    private itemListOptionsService: ItemListOptionsService,
  ) {
  }

  ngOnInit(): void {
  }

  activeIndexChange(index: number) {
    this.listStyle$.next(this.itemListOptions[index].className);
  }
}
