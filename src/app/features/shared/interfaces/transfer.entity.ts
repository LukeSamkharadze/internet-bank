export interface Transfer {
  id?: number;
  title: string;
  type: 'bank' | 'instant' | 'electronic' | 'online' | 'phone' | 'cash';
  amount: number;
  fromAccountNumber: string;
  fromAccountUserId: string;
  date: Date;
  currency: string;
}
