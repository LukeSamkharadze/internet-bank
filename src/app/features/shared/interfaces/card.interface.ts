export interface ICard {
  id: number;
  cardName: string;
  accountNumber: string;
  cardNumber: string;
  cardholder: string;
  expirationDate: string;
  availableAmount: number;
  security3D: boolean;
  balance?: number;
  blocked?: boolean;
}
