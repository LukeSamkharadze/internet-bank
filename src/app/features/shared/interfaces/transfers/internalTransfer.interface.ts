import { Transfer } from './transfer.interface';

export interface InternalTransfer extends Transfer {
  instantTransferType: string;
  toAccountNumber: string;
}
