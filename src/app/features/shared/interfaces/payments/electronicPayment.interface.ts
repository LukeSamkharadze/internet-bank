import { Transfer } from './transfer.interface';

export interface ElectronicPayment extends Transfer {
  paymentSystem: string;
  toAccountEmail: string;
}
