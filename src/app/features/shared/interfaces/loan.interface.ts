export interface ILoan {
  id: number;
  loanName: string;
  accountNumber: string;
  loanRate: number;
  startDate: string;
  expirationDate: string;
  amount?: number;
  paid?: number;
  status?: boolean;
}
