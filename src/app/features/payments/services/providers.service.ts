import { Injectable } from '@angular/core';
import { PaymentType } from '../models/paymentType.entity';

@Injectable()
export class ProvidersService {
  private paymentTypes: PaymentType[] = [
    {
      name: 'Electronic Payments',
      providers: ['Paypal', 'Skrill', 'Payoneer'],
      icon: 'las la-credit-card',
      formPath: 'electronic-payment',
    },
    {
      name: 'Bank Transfer',
      providers: ['TBC'],
      icon: '',
      formPath: 'bank-transfer',
    },
    {
      name: 'Instant Transfer',
      providers: ['Visa', 'Mastercard'],
      icon: 'las la-cart-plus',
      formPath: 'instant-transfer',
    },
  ];

  getAllPaymentTypes(): PaymentType[] {
    return this.paymentTypes;
  }
}
