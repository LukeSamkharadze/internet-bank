import { ListStyleEnum } from './list-style.enum';

export interface ItemListOption {
  id: number;
  title: string;
  className: ListStyleEnum;
  default: boolean;
}
