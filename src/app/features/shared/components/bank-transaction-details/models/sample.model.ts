import { Itransaction } from '../../../interfaces/bank-transactions.interface';

export const sample: Itransaction = {
  title: 'Bank transfer to user: 3',
  toUserId: 3,
  date: '2021-02-28T16:39:38.183Z',
  type: 'bank',
  fromAccountUserId: 2,
  fromAccountNumber: 3333111122224444,
  toAccountNumber: 1111222233334444,
  amount: '20',
  currency: 'USD',
  beneficiary: 'gamarjoba batono obama',
  bankTransferType: 'personal transfer',
  status: 'pending',
  id: 1,
  iconPath: './assets/transfers/default.png',
};
