import IParent from './parent.interface';

export interface ICard extends IParent {
  cardName: string;
  cardNumber: string;
  cardholder: string;
  availableAmount: number;
  security3D: boolean;
  iconPath?: string;
}
