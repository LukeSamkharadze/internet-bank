import { SharedTransfer } from './sharedTransfer.entity';

export interface InstantTransferEntity extends SharedTransfer {
  destinationAccountNumber: string;
  transferType: string;
}
