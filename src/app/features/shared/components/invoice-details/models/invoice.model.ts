import { Item } from './item.model';

export interface Invoice {
  number: string;
  title: string;
  address: {
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    country: string;
    mail: string;
  };
  date: string;
  due: string;
  tagColor: string;
  status: string;
  currency: string;
  items: Item[];
}
