import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { Itransaction } from '../../../interfaces/bank-transactions.interface';
import { IconService } from '../../../services/icon.service';
@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  host = 'http://localhost:3000';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private iconService: IconService
  ) {}

  getTransactions(date: string, type: string, accountNumber: string) {
    let url1 = '';
    let url2 = '';

    if (accountNumber) {
      if (date) {
        url1 = `${this.host}/transactions?fromAccountNumber=${accountNumber}&date_like=${date}`;
        url2 = `${this.host}/transactions?toAccountNumber=${accountNumber}&date_like=${date}`;
      } else {
        url1 = `${this.host}/transactions?fromAccountNumber=${accountNumber}`;
        url2 = `${this.host}/transactions?toAccountNumber=${accountNumber}`;
      }
    } else {
      if (type === 'all') {
        type = null;
      }

      if (date !== null && date !== undefined) {
        if (type !== null && type !== undefined) {
          url1 = `${this.host}/transactions?fromAccountUserId=${this.authService.userId}&date_like=${date}&type=${type}`;
          url2 = `${this.host}/transactions?toUserId=${this.authService.userId}&date_like=${date}&type=${type}`;
        } else {
          url1 = `${this.host}/transactions?fromAccountUserId=${this.authService.userId}&date_like=${date}`;
          url2 = `${this.host}/transactions?toUserId=${this.authService.userId}&date_like=${date}`;
        }
      } else {
        if (type !== null && type !== undefined) {
          url1 = `${this.host}/transactions?fromAccountUserId=${this.authService.userId}&type=${type}`;
          url2 = `${this.host}/transactions?toUserId=${this.authService.userId}&type=${type}`;
        } else {
          url1 = `${this.host}/transactions?fromAccountUserId=${this.authService.userId}`;
          url2 = `${this.host}/transactions?toUserId=${this.authService.userId}`;
        }
      }
    }

    return this.httpClient.get(url1).pipe(
      mergeMap((transaction1: Array<Itransaction>) => {
        return this.httpClient.get(url2).pipe(
          map((transaction2: Array<Itransaction>) => {
            const concatenated = transaction1.concat(transaction2);
            const result = new Array<Itransaction>();

            concatenated.forEach((element) => {
              result.push(this.iconService.determineTransfersIcon(element));
            });

            result.forEach((element) => {
              if (String(element.toUserId) !== this.authService.userId) {
                element.amount = `-${element.amount}`;
              }
            });

            return result;
          })
        );
      })
    );
  }
}
