import { Injectable } from '@angular/core';
import { ItemListOption } from '../models/item-list-option.entity';
import { ListStyleEnum } from '../models/list-style.enum';

@Injectable()
export class ItemListOptionsService {
  private itemListOptions: ItemListOption[] = [
    {
      id: 1,
      title: 'List',
      className: ListStyleEnum.list,
      default: false,
    },
    {
      id: 2,
      title: 'Grid',
      className: ListStyleEnum.grid,
      default: true,
    },
  ];

  constructor() {}

  getItemListOptions(): ItemListOption[] {
    return this.itemListOptions;
  }

  getDefaultIndex(): number {
    return this.itemListOptions.findIndex((ob) => ob.default);
  }

  getDefaultClassName(): ListStyleEnum {
    return this.itemListOptions[this.getDefaultIndex()].className;
  }
}
