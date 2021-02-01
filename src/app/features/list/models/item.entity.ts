export interface ItemEntity {
  id: number;
  name: string;
  img: string;
}

export interface ItemListOption {
  id: number;
  title: string;
  className: ListStyleEnum;
  default: boolean;
}

export enum ListStyleEnum {
  list = 'list',
  grid = 'grid',
}
