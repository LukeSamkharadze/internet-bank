import { Injectable } from '@angular/core';
import { PaymentType } from '../models/paymentType.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { from, Observable } from 'rxjs';
import { filter, map, switchMap, toArray } from 'rxjs/operators';

@Injectable()
export class ProvidersService {
  constructor(private http: HttpClient) {}

  getPaymentTypes(userFilter: string = ''): Observable<PaymentType[]> {
    return this.http
      .get<PaymentType[]>(environment.BaseUrl + 'paymentTypes')
      .pipe(
        switchMap((data) => from(data)),
        filter((data: PaymentType) => {
          for (const provider of data.providers) {
            if (
              provider.title
                .toLowerCase()
                .indexOf(userFilter.toLocaleLowerCase()) >= 0
            ) {
              return true;
            }
          }
        }),
        toArray()
      );
  }

  getElectronicPaymentProviders(): Observable<
    { title: string; iconPath?: string }[]
  > {
    return this.http
      .get<PaymentType[]>(environment.BaseUrl + 'paymentTypes')
      .pipe(
        switchMap((data) => from(data)),
        filter((data: PaymentType) => {
          if (data.name === 'Electronic Payments') {
            return true;
          }
        }),
        map((data: PaymentType) => data.providers)
      );
  }
}
