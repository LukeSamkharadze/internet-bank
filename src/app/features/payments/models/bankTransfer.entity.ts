import { SharedTransfer } from './sharedTransfer.entity';

export interface BankTransfer extends SharedTransfer {
  destinationAccountNumber: string;
  beneficiary: string;
  currency: string;
  transferType: string;
  // daemateba roca user authentication morcheba.
  // toUserId: number;
}
