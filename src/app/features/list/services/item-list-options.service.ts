import { Injectable } from '@angular/core';
import { ItemListOption, ListStyleEnum } from '../models/item.entity';

@Injectable()
export class ItemListOptionsService {
  private itemListOptions: ItemListOption[] = [
    {
      id: 1,
      title: 'List',
      className: ListStyleEnum.list,
      default: true,
    },
    {
      id: 2,
      title: 'Grid',
      className: ListStyleEnum.grid,
      default: false,
    },
  ];

  constructor() {}

  getItemListOptions(): ItemListOption[] {
    return this.itemListOptions;
  }
}
