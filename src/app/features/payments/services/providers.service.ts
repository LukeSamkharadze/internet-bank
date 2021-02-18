import { Injectable } from '@angular/core';
import { PaymentType } from '../models/paymentType.entity';

@Injectable()
export class ProvidersService {
  private paymentTypes: PaymentType[] = [
    {
      name: 'Electronic Payments',
      providers: [
        {
          title: 'Paypal',
          iconPath: './assets/electronic-payments/PayPal.svg',
        },
        {
          title: 'Skrill',
          iconPath: './assets/electronic-payments/Skrill_logo.svg',
        },
        {
          title: 'Payoneer',
          iconPath: './assets/electronic-payments/Payoneer_logo.svg',
        },
      ],
      icon: 'las la-credit-card',
      formPath: 'electronic-payment',
    },
    {
      name: 'Bank Transfer',
      providers: [{ title: 'TBC' }],
      icon: 'las la-piggy-bank',
      formPath: 'bank-transfer',
    },
    {
      name: 'Instant Transfer',
      providers: [{ title: 'Visa' }, { title: 'Mastercard' }],
      icon: 'las la-cart-plus',
      formPath: 'instant-transfer',
    },
  ];

  getAllPaymentTypes(): PaymentType[] {
    return this.paymentTypes;
  }

  getElectronicPaymentProviders(): { title: string; iconPath?: string }[] {
    return this.paymentTypes[0].providers;
  }
}
