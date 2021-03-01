export interface TransactionsList {
  id: number;
  title: string;
  iconPath: string;
  type: string;
  beneficiary: string;
  amount: string;
  date: Date;
  status: string;

  fromAccountNumber: number;
  toAccountNumber: number;
  fromAccountUserId: number;
  bankTransferType: string;
  toUserId: number;
  currency: string;
}
