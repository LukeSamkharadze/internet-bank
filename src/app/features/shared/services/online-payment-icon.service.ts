import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OnlinePaymentIconService {
  private onlinePayments: string[] = ['paypal', 'skrill', 'payoneer'];

  determineOnlinePaymentsIcon(obj: any, title: string) {
    console.log(title);
    title = title.toLocaleLowerCase();
    return {
      ...obj,
      iconPath: this.onlinePayments.includes(title)
        ? `./assets/electronic-payments/${title}.svg`
        : undefined,
    };
  }
}
