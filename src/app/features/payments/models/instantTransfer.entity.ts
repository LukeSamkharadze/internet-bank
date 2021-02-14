import { SharedTransfer } from './sharedTransfer.entity';

export interface InstantTransfer extends SharedTransfer {
  destinationAccountNumber: string;
  transferType: string;
  // daemateba roca user authentication morcheba.
  // toUserId: number;
}
