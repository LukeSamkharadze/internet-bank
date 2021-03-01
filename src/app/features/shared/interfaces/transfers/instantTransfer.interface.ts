import { Transfer } from './transfer.interface';

export interface InstantTransfer extends Transfer {
  instantTransferType: string;
  toAccountNumber: string;
}
