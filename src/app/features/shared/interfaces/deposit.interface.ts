import IParent from './parent.interface';

export interface IDeposit extends IParent {
  depositName: string;
  depositRate: number;
  startDate: string;
  accured?: number;
  type: DepositType;
}

export type DepositType = 'Cumulative';
