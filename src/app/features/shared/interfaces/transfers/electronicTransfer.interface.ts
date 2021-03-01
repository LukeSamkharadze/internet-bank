import { Transfer } from './transfer.interface';

export interface ElectronicTransfer extends Transfer {
  paymentSystem: string;
  toAccountEmail: string;
}
