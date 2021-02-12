import { ICard } from '../../shared/interfaces/card.interface';

export interface SharedTransfer {
  paymentType: 'bank' | 'electronic' | 'instant';
  fromAccount: ICard;
  amount: number;
  id?: number;
  date: Date;
}
