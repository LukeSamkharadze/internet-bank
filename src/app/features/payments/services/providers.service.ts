import { Injectable } from '@angular/core';
import { PaymentType } from '../models/paymentType.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  toArray,
} from 'rxjs/operators';
import { IconService } from '../../shared/services/icon.service';

@Injectable()
export class ProvidersService {
  private paymentTypes: PaymentType[] = [];

  private store$ = new BehaviorSubject<PaymentType[]>(this.paymentTypes);

  public paymentTypes$ = this.store$.pipe(distinctUntilChanged());

  constructor(private http: HttpClient, private iconService: IconService) {
    this.updateStore();
  }

  updateStore(inputValue: string = '') {
    this.getPaymentTypes(inputValue).subscribe((data) => {
      this.store$.next((this.paymentTypes = data));
    });
  }

  onSearch(inputValue: string) {
    this.updateStore(inputValue);
  }

  private getPaymentTypes(userFilter: string = ''): Observable<PaymentType[]> {
    return this.http
      .get<PaymentType[]>(environment.BaseUrl + 'paymentTypes')
      .pipe(
        switchMap((data) => from(data)),
        filter((data: PaymentType) => {
          for (const provider of data.providers) {
            if (
              provider.name
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
    { name: string; iconPath?: string }[]
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
        map((data: PaymentType) => {
          const providers = [];
          data.providers.forEach((provider) => {
            providers.push(
              this.iconService.determineElectronicPaymentsIcon(
                provider,
                provider.name
              )
            );
          });
          return providers;
        })
      );
  }
}
