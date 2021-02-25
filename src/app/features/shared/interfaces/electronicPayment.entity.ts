import { Transfer } from './transfer.entity';

export interface ElectronicPayment extends Transfer {
  paymentSystem: string;
  toAccountEmail: string;
}
