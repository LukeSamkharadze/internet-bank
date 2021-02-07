import { SharedTransfer } from './sharedTransfer.entity';

export interface ElectronicTransfer extends SharedTransfer {
  paymentSystem: string;
  destinationIdentifier: string | number; // email or id.
  currency: string;
}
