export interface SharedTransfer {
  paymentType: 'bank' | 'electronic' | 'instant';
  fromAccount: string; // type should be of Account. temporarily string.
  amount: number;
  id?: number;
  date: Date;
  // unda daematos incomeOrOutcome: income | outcome.
  // unda daematos statusi: success | failure ( error reason)
}
