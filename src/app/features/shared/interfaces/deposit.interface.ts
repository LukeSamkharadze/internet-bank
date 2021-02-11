export interface IDeposit {
  id: number;
  depositName: string;
  accountNumber: string;
  depositRate: number;
  startDate: string;
  expirationDate: string;
  balance?: number;
  accured?: number;
  functional?: boolean;
}
