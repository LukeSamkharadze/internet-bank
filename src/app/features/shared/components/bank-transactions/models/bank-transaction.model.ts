export interface TransactionsList {
  id: number;
  title: string;
  icon: string;
  type: string;
  beneficiary: string;
  amount: string;
  date: Date;
  status: string;
  cardNumber: string;
  toAccountNumber: number;
  fromAccountUserId: number;
  bankTransferType: string;
  toUserId: number;
  currency: string;
}