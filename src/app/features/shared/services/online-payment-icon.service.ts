import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OnlinePaymentIconService {
  determineOnlinePaymentsIcon(obj: any, title: string) {
    title = title.toLocaleLowerCase();
    switch (title) {
      case 'paypal':
        return {
          ...obj,
          iconPath: `./assets/electronic-payments/${title}.svg`,
        };
      case 'skrill':
        return {
          ...obj,
          iconPath: `./assets/electronic-payments/${title}.svg`,
        };
      case 'payoneer':
        return {
          ...obj,
          iconPath: `./assets/electronic-payments/${title}.svg`,
        };
      default:
        return {
          ...obj,
          iconPath: 'path_to_default',
        };
    }
  }
}
// ooga booga
