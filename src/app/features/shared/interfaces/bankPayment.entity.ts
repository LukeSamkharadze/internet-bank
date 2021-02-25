import { Transfer } from './transfer.entity';

export interface BankPayment extends Transfer {
  toAccountNumber: string;
  toUserId: string;
  beneficiary: string;
  bankTransferType: string;
}
