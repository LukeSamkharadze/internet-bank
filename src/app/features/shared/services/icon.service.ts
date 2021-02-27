import { Injectable } from '@angular/core';
import { Transfer } from '../interfaces/payments/transfer.interface';
import { ElectronicPayment } from '../interfaces/payments/electronicPayment.interface';
import { ICard } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private electronicPayments: string[] = ['paypal', 'skrill', 'payoneer'];
  private transferTypes = [
    'bank',
    'electronic',
    'instant',
    'phone',
    'cash',
    'online',
  ];
  private cardTypes = ['mastercard', 'visa'];

  // obj: any, because it will work on transfer and on ```paymentType => providers -> {name: paypal}``` as well.
  determineElectronicPaymentsIcon(obj: any, title: string) {
    title = title.toLocaleLowerCase();
    return this.electronicPayments.includes(title)
      ? { ...obj, iconPath: `./assets/electronic-payments/${title}.svg` }
      : obj;
  }

  determineTransfersIcon(transfer: Transfer) {
    if (transfer.type === 'electronic') {
      return this.determineElectronicPaymentsIcon(
        transfer,
        (transfer as ElectronicPayment).paymentSystem
      );
    } else {
      return this.transferTypes.includes(transfer.type)
        ? { ...transfer, iconPath: `./assets/transfers/${transfer.type}.svg` }
        : transfer;
    }
  }

  determineCardIcon(card: ICard): ICard {
    const cardType = card.cardType;
    return this.cardTypes.includes(cardType)
      ? { ...card, iconPath: `./assets/cards/${cardType}.svg` }
      : card;
  }
}
