import { Transfer } from './transfer.interface';

export interface InternalTransfer extends Transfer {
  internalTransferType: string;
  toAccountNumber: string;
}
