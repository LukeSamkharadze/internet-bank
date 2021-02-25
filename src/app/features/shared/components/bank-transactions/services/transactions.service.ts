import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reduce, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Itransaction } from '../../../interfaces/bank-transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  host = 'http://localhost:3000';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getTransactions(date: string, type: string) {
    let url = '';
    // let url1 = '';
    // let url2 = '';
    if (type === 'All') {
      type = null;
    }

    if (date !== null && date !== undefined) {
      if (type !== null && type !== undefined) {
        url = `${this.host}/transaction?userId=${this.authService.userId}&date_like=${date}&type=${type}`;
      } else {
        url = `${this.host}/transaction?userId=${this.authService.userId}&date_like=${date}`;
      }
    } else {
      if (type !== null && type !== undefined) {
        url = `${this.host}/transaction?userId=${this.authService.userId}&type=${type}`;
      } else {
        url = `${this.host}/transaction?fromUser=${this.authService.userId}`;
        // url2 = `${this.host}/transaction?toUser=${this.authService.userId}`;
      }
    }

    // return  this.httpClient.get(url1).pipe(
    //       mergeMap((transaction1: Array<Itransaction>) => {
    //         return this.httpClient.get(url2).pipe(
    //           map((transaction2: Array<Itransaction>) =>{
    //             return [transaction1, transaction2]
    //           })
    //         );
    //       })
    //     );

    return this.httpClient.get(url).pipe(
      map((transaction: Array<Itransaction>) => {
        return transaction.map((tr) => {
          return tr;
        });
      })
    );

    // if (date !== null && date !== undefined) {
    //   if (type !== null && type !== undefined) {
    //     if (type === 'All') {
    //       url = `${this.host}/transaction?userId=${this.authService.userId}&date_like=${date}`;
    //     } else {
    //       url = `${this.host}/transaction?userId=${this.authService.userId}&date_like=${date}&type=${type}`;
    //     }
    //   } else {
    //     url = `${this.host}/transaction?userId=${this.authService.userId}&date_like=${date}`;
    //   }
    // } else {
    //   if (type === 'All') {
    //     url = `${this.host}/transaction?userId=${this.authService.userId}`;
    //   } else {
    //       if (type !== null && type !== undefined) {
    //         url = `${this.host}/transaction?userId=${this.authService.userId}&type=${type}`;
    //       } else {
    //         url = `${this.host}/transaction?toUser=${this.authService.userId}`;
    //       }
    //   }
    // }

    // if (date !== null && date !== undefined) {
    //   if (type !== null && type !== undefined) {
    //     if (type === 'All') {
    //       url = `${this.host}/transaction?userId=${this.authService.userId}&date_like=${date}`;
    //     } else {
    //       url = `${this.host}/transaction?userId=${this.authService.userId}&date_like=${date}&type=${type}`;
    //     }
    //   } else {
    //     url = `${this.host}/transaction?userId=${this.authService.userId}&date_like=${date}`;
    //   }
    // } else {
    //   if (type === 'All') {
    //     url = `${this.host}/transaction?userId=${this.authService.userId}`;
    //   } else if (type !== null && type !== undefined) {
    //     url = `${this.host}/transaction?userId=${this.authService.userId}&type=${type}`;
    //   } else {
    //     url = `${this.host}/transaction?userId=${this.authService.userId}`;
    //   }
    // }
  }
}
