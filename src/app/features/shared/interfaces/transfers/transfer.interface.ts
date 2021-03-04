export interface Transfer {
  id?: number;
  title: string;
  type: 'bank' | 'internal' | 'electronic' | 'online' | 'phone' | 'cash';
  amount: number;
  fromAccountNumber: string;
  fromAccountUserId: string;
  date: Date;
  currency: string;
  iconPath?: string;
}
