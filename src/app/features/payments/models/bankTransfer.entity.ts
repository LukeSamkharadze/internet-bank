import { SharedTransfer } from './sharedTransfer.entity';

export interface BankTransfer extends SharedTransfer {
  destinationAccountNumber: string;
  beneficiary: string;
  currency: string;
  transferType: string;
}
