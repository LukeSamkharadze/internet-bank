import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reduce, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Itransaction } from '../../../interfaces/bank-transactions.interface';
import { OnlinePaymentIconService } from '../../../services/online-payment-icon.service';
import { constants } from 'http2';
@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  host = 'http://localhost:3000';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private onlinePaymentIconService: OnlinePaymentIconService
  ) {}

  getTransactions(date: string, type: string) {
    let url1 = '';
    let url2 = '';
    if (type === 'All') {
      type = null;
    }

    if (date !== null && date !== undefined) {
      if (type !== null && type !== undefined) {
        url1 = `${this.host}/transaction?fromUser=${this.authService.userId}&date_like=${date}&type=${type}`;
        url2 = `${this.host}/transaction?toUser=${this.authService.userId}&date_like=${date}&type=${type}`;
      } else {
        url1 = `${this.host}/transaction?fromUser=${this.authService.userId}&date_like=${date}`;
        url2 = `${this.host}/transaction?toUser=${this.authService.userId}&date_like=${date}`;
      }
    } else {
      if (type !== null && type !== undefined) {
        url1 = `${this.host}/transaction?fromUser=${this.authService.userId}&type=${type}`;
        url2 = `${this.host}/transaction?toUser=${this.authService.userId}&type=${type}`;
      } else {
        url1 = `${this.host}/transaction?fromUser=${this.authService.userId}`;
        url2 = `${this.host}/transaction?toUser=${this.authService.userId}`;
      }
    }

    return this.httpClient.get(url1).pipe(
      mergeMap((transaction1: Array<Itransaction>) => {
        return this.httpClient.get(url2).pipe(
          map((transaction2: Array<Itransaction>) => {
            const concatenated = transaction1.concat(transaction2);
            const result = new Array<Itransaction>();

            concatenated.forEach((element) => {
              result.push(
                this.onlinePaymentIconService.determineOnlinePaymentsIcon(
                  element,
                  element.beneficiary
                )
              );
            });

            return result;
          })
        );
      })
    );
  }
}
