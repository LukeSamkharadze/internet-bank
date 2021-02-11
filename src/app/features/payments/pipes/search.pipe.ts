import { Pipe, PipeTransform } from '@angular/core';
import { PaymentType } from '../models/paymentType.entity';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(paymentTypes: PaymentType[], input: string): PaymentType[] {
    if (input) {
      return paymentTypes.filter((payment) => {
        for (const provider of payment.providers) {
          if (
            provider.title.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0
          ) {
            return payment;
          }
        }
      });
    } else {
      return paymentTypes;
    }
  }
}
