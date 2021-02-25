import { Injectable } from '@angular/core';
import { Transfer } from '../interfaces/transfer.entity';
import { ElectronicPayment } from '../interfaces/electronicPayment.entity';
import { ICard } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private onlinePayments: string[] = ['paypal', 'skrill', 'payoneer'];

  determineOnlinePaymentsIcon(obj: any, title: string) {
    title = title.toLocaleLowerCase();
    return {
      ...obj,
      iconPath: this.onlinePayments.includes(title)
        ? `./assets/electronic-payments/${title}.svg`
        : undefined,
    };
  }

  determineTransfersIcon(transfer: Transfer) {
    switch (transfer.type) {
      case 'bank':
        return {
          ...transfer,
          iconPath: './assets/tbc.svg',
        };

      case 'electronic':
        return this.determineOnlinePaymentsIcon(
          transfer,
          (transfer as ElectronicPayment).paymentSystem
        );

      case 'instant':
        return {
          ...transfer,
          iconPath: './assets/instant.svg',
        };

      case 'phone':
        return {
          ...transfer,
          iconPath: './assets/phone.svg',
        };

      case 'cash':
        return {
          ...transfer,
          iconPath: './assets/cash.svh',
        };
      case 'online': // currently online transfer model is unknown, that's why icon is static.
        return {
          ...transfer,
          iconPath: './assets/icon.svg',
        };
    }
  }

  determineIconPath(card: ICard): ICard {
    switch (card.cardType) {
      case 'VISA':
        return {
          ...card,
          iconPath: './assets/create-card/create-card-visa-icon.svg',
        };
      case 'MASTERCARD':
        return {
          ...card,
          iconPath: './assets/create-card/mastercard.svg',
        };
      default:
        return { ...card };
    }
  }
}
