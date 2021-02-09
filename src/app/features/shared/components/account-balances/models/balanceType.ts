export interface individualBalance {
  cardNumber: number;
  accountNumber: string;
  expirationDate: string;
  availableAmount: number;
  arrow: string;
  security3D: boolean;
  cardName: string;
}
export interface BalanceStructure {
  balances: individualBalance[];
  cardholder: string;
  id: number;
}
