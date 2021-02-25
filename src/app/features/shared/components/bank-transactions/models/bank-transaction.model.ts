export interface TransactionsList {
  id: number;
  title: string;
  icon: string;
  type: string;
  typeId: number;
  transactionType: string;
  beneficiary: string;
  amount: string;
  date: string;
  status: string;
  tagColor: string;
  cardNumber: number;
  fromUser: number;
  toUser?: number;
}
