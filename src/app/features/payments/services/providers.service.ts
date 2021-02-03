import { Injectable } from '@angular/core';
import { PaymentType } from '../models/paymentType.entity';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProvidersService {
  constructor() {}

  private paymentTypes: PaymentType[] = [
    {
      name: 'Electronic Payments',
      providers: ['Paypal', 'Skrill', 'Payoneer'],
    },
    {
      name: 'Bank Transfer',
      providers: ['TBC'],
    },
    {
      name: 'Instant Transfer',
      providers: ['Visa', 'Mastercard'],
    },
  ];

  public chosenPaymentTypeName: BehaviorSubject<string> = new BehaviorSubject<
    string
  >(this.paymentTypes[0].name);

  getAllPaymentTypes(): PaymentType[] {
    return this.paymentTypes;
  }

  changePaymentTypeName(newPaymentTypeName: string) {
    this.chosenPaymentTypeName.next(newPaymentTypeName);
  }
}
