import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ItemEntity, ItemListOption, ListStyleEnum } from './models/item.entity';
import { ItemService } from './services/item.service';
import { map } from 'rxjs/operators';
import { ItemListOptionsService } from './services/item-list-options.service';

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
    this.getDefaultIndex(),
  );
  listStyle$: BehaviorSubject<ListStyleEnum> = new BehaviorSubject<ListStyleEnum>(this.getDefaultClassName());

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

  getDefaultIndex(): number {
    return this.itemListOptions.findIndex((ob) => ob.default);
  }

  getDefaultClassName(): ListStyleEnum {
    return this.itemListOptions[this.getDefaultIndex()].className;
  }

  activeIndexChange(index: number) {
    this.listStyle$.next(this.itemListOptions[index].className);
  }
}
