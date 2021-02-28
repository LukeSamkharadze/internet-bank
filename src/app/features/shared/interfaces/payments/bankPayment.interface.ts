import { Transfer } from './transfer.interface';

export interface BankPayment extends Transfer {
  toAccountNumber: string;
  toUserId: string;
  beneficiary: string;
  bankTransferType: string;
}
