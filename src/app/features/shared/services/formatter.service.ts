import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatterService {
  /**
   * Returns number with hidden middle 8 digits and formatted easy-to-read way.
   * @param strnum string of number to be formatted
   * @returns Ex.: 1234567890123456 => 1234 \*\*\*\* \*\*\*\* 3456
   */
  cardNumberHideMiddle(strnum: string): string {
    strnum = strnum.trim().split(' ').join('');
    return this.formatCardNumber(
      strnum.substr(0, 4) +
        Array(3).join(Array(5).join('*')) +
        strnum.substr(-4, 4)
    );
  }

  formatCardNumber(strnum: string, separator: string = ' '): string {
    return strnum.match(/.{1,4}/g).join(separator);
  }

  /**
   * Returns formatted balance with currency before or after it
   * @param balance balance which will be formatted
   * @param currency currency to add to balance Ex.: '$', 'GEL'...
   * @param toRight if true, currency will appear after balance
   */
  /**
   * Returns formatted balance with currency before or after it
   * @param balance balance which will be formatted
   * @param options additional options
   * @param options.currency currency to add to balance Ex.: '$', 'GEL'...
   * @param options.toRight if true, currency will appear after balance
   * @param options.toFixed zeros after number
   */
  formatBalance(
    balance: number,
    options: { currency?: string; toRight?: boolean; toFixed?: number } = {}
  ): string {
    const { currency = '', toRight = false, toFixed = 0 } = options;
    balance = +balance.toFixed(2);
    const balanceSides = (
      (toFixed ? balance.toFixed(toFixed) : balance) || balance.toFixed(2)
    )
      .toString()
      .split('.');
    balanceSides[0] = balanceSides[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedBalance = balanceSides.join('.');
    return toRight ? formattedBalance + currency : currency + formattedBalance;
  }

  capitalizeAllWord(str: string): string {
    return str
      .split(' ')
      .map((v) => v[0].toUpperCase() + v.substr(1).toLowerCase())
      .join(' ');
  }
}
