import AccountType from './account-type.enum';

export default interface IItem {
  type: AccountType;
  balance: number;
  amount: number;
  additionalInfo: string;
  status: string;
  number?: string;
}
