export interface SharedTransfer {
  paymentType: 'bank' | 'electronic' | 'instant';
  fromAccount: string; // type should be of Account. temporarily string.
  amount: number;
  id?: number;
  date: Date;
}
