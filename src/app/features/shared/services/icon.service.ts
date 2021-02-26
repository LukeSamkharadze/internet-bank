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

  determineTransfersIcon(transfer: any) {
    if (transfer.type.toLocaleLowerCase() === 'electronic') {
      return this.determineElectronicPaymentsIcon(
        transfer,
        (transfer as ElectronicPayment).paymentSystem
      );
    } else {
      return this.transferTypes.includes(transfer.type.toLocaleLowerCase())
        ? {
            ...transfer,
            iconPath: `./assets/transfers/${transfer.type.toLocaleLowerCase()}.png`,
          }
        : transfer;
    }
  }

  determineCardIcon(card: ICard): ICard {
    const cardType = card.cardType.toLocaleLowerCase();
    return this.cardTypes.includes(cardType.toLocaleLowerCase())
      ? {
          ...card,
          iconPath: `./assets/cards/${cardType.toLocaleLowerCase()}.svg`,
        }
      : card;
  }
}
