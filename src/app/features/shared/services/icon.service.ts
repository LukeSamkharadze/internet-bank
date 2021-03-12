import { Injectable } from '@angular/core';
import { ElectronicTransfer } from '../interfaces/transfers/electronicTransfer.interface';
import { ICard } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private electronicPayments: string[] = ['paypal', 'skrill', 'payoneer'];
  private transferTypes = [
    'bank',
    'electronic',
    'internal',
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
        (transfer as ElectronicTransfer).paymentSystem
      );
    } else if (transfer.type.toLocaleLowerCase() === 'bank') {
      const iconPath = transfer.toUserId
        ? './assets/transfers/internal.svg'
        : './assets/transfers/external.svg';
      return {
        ...transfer,
        iconPath: `${iconPath}`,
      };
    } else {
      return this.transferTypes.includes(transfer.type.toLocaleLowerCase())
        ? {
            ...transfer,
            iconPath: `./assets/transfers/${transfer.type.toLocaleLowerCase()}.svg`,
          }
        : transfer;
    }
  }

  determineCardIcon(card: ICard): ICard {
    return {
      ...card,
      iconPath: `./assets/cards/${
        card.cardType &&
        this.cardTypes.includes(card.cardType.toLocaleLowerCase())
          ? card.cardType.toLocaleLowerCase()
          : 'default'
      }.svg`,
    };
  }
}
