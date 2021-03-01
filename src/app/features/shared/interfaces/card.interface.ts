import IParent from './parent.interface';

export interface ICard extends IParent {
  cardName: string;
  cardType: CardType;
  cardNumber: string;
  cardholder: string;
  availableAmount: number;
  security3D: boolean;
  iconPath?: string;
  color?: string;
}

export type CardType = 'visa' | 'mastercard';
