import { Injectable } from '@angular/core';
import { Transfer } from '../interfaces/transfer.entity';
import { ElectronicPayment } from '../interfaces/electronicPayment.entity';
import { ICard } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private electronicPayments: string[] = ['paypal', 'skrill', 'payoneer'];
  private transferTypes = ['bank', 'electronic', 'instant', 'phone', 'cash'];
  private cardTypes = ['mastercard', 'visa'];

  determineElectronicPaymentsIcon(obj: any, title: string) {
    title = title.toLocaleLowerCase();
    return {
      ...obj,
      iconPath: this.electronicPayments.includes(title)
        ? `./assets/electronic-payments/${title}.svg`
        : undefined,
    };
  }

  determineTransfersIcon(transfer: Transfer) {
    if (transfer.type === 'electronic') {
      return this.determineElectronicPaymentsIcon(
        transfer,
        (transfer as ElectronicPayment).paymentSystem
      );
    } else {
      return {
        ...transfer,
        iconPath: this.transferTypes.includes(transfer.type)
          ? `./assets/transfers/${transfer.type}.svg`
          : undefined,
      };
    }
  }

  determineCardIconPath(card: ICard): ICard {
    return {
      ...card,
      iconPath: this.cardTypes.includes(card.cardType.toLocaleLowerCase())
        ? `./assets/create-card/${card.cardType.toLocaleLowerCase()}.svg`
        : undefined,
    };
  }
}
