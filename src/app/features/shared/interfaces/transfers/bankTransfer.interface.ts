import { Transfer } from './transfer.interface';

export interface BankTransfer extends Transfer {
  toAccountNumber: string;
  toUserId: string;
  beneficiary: string;
  bankTransferType: string;
}
