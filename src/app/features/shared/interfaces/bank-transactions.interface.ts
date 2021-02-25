export interface Itransaction {
  id: number;
  title: string;
  iconPath: string;
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
  toUser: number;
}
