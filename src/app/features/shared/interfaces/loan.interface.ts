import IParent from './parent.interface';

export interface ILoan extends IParent {
  loanName: string;
  loanRate: number;
  startDate: string;
  paid?: number;
  type: LoanType;
}

export type LoanType = 'Mortgage' | 'Consumer';
