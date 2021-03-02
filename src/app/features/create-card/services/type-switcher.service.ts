import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackgroundService } from '../../shared/services/background.service';
import { CardService } from '../../shared/services/card.service';
import { IconService } from '../../shared/services/icon.service';
import { ICard, CardType } from '../../shared/interfaces/card.interface';

@Injectable()
export class TypeSwitcherService {
  cardType$: BehaviorSubject<string> = new BehaviorSubject('');
  cardIconUrl$: BehaviorSubject<string> = new BehaviorSubject('');
  cardBgUrl$: BehaviorSubject<string> = new BehaviorSubject(
    this.backgroundService.getBackground('light-orange')
  );
  color$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private backgroundService: BackgroundService,
    private cardService: CardService,
    private iconService: IconService
  ) {}

  checkInput(inCard: ICard) {
    const card = this.cardService.determineCardType(inCard);
    if (card.cardType) {
      const cardType = this.transformCardType(card.cardType);
      // Visa or Mastercard values
      this.cardType$.next(cardType);
      this.cardIconUrl$.next(this.iconService.determineCardIcon(card).iconPath),
        this.cardBgUrl$.next(this.cardService.determineBackground(card)),
        this.color$.next(this.cardService.determineColor(card));
    } else {
      // Default value
      this.assignDefault();
    }
  }

  assignDefault() {
    this.cardType$.next(''),
      this.cardIconUrl$.next(''),
      this.cardBgUrl$.next(
        this.backgroundService.getBackground('light-orange')
      ),
      this.color$.next('');
  }

  // Uppercase 'cardType' first letter, if 'visa' add " card" string at the end
  transformCardType(cardType: CardType) {
    if (cardType === 'visa') {
      return cardType.charAt(0).toUpperCase() + cardType.substring(1) + ' card';
    }
    return cardType.charAt(0).toUpperCase() + cardType.substring(1);
  }
}
