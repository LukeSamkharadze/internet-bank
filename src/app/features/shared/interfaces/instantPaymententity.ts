import { Transfer } from './transfer.entity';

export interface InstantPayment extends Transfer {
  instantTransferType: string;
  toAccountNumber: string;
}
