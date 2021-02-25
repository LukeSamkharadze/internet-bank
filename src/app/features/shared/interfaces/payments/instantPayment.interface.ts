import { Transfer } from './transfer.interface';

export interface InstantPayment extends Transfer {
  instantTransferType: string;
  toAccountNumber: string;
}
