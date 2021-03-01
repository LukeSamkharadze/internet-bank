import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TypeSwitcherService {
  cardType$: BehaviorSubject<string> = new BehaviorSubject('');
  cardIconUrl$: BehaviorSubject<string> = new BehaviorSubject('');
  cardBgUrl$: BehaviorSubject<string> = new BehaviorSubject(
    './assets/cards/backgrounds/light-orange.svg'
  );
  color$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  checkInput(input?: string) {
    switch (input) {
      case '4':
        return (
          this.cardType$.next('Visa card'),
          this.cardIconUrl$.next('./assets/cards/visa.svg'),
          this.cardBgUrl$.next('./assets/cards/backgrounds/blue.svg'),
          this.color$.next('visa-cl')
        );
      case '5':
        return (
          this.cardType$.next('Mastercard'),
          this.cardIconUrl$.next('./assets/cards/mastercard.svg'),
          this.cardBgUrl$.next('./assets/cards/backgrounds/orange.svg'),
          this.color$.next('master-cl')
        );
      default:
        return (
          this.cardType$.next(''),
          this.cardIconUrl$.next(''),
          this.cardBgUrl$.next('./assets/cards/backgrounds/light-orange.svg'),
          this.color$.next('')
        );
    }
  }
}
