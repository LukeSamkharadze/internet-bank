export interface IndividualBalance {
  cardNumber: number;
  accountNumber: string;
  expirationDate: string;
  availableAmount: number;
  arrow: string;
  security3D: boolean;
  cardName: string;
}
export interface BalanceStructure {
  balances: IndividualBalance[];
  cardholder: string;
  id: number;
}
