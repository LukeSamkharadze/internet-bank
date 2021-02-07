import { SharedTransfer } from './sharedTransfer.entity';

export interface ElectronicTransfer extends SharedTransfer {
  paymentSystem: string;
  destinationEmail: string;
  currency: string;
}
