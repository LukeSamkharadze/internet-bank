import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reduce, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface Itransaction {
  id: number;
  title: string;
  img: string;
  type: string;
  typeId: number;
  amount: string;
  date: string;
  status: string;
  tagColor: string;
  cardNumber: number;
}

@Injectable({
  providedIn: 'root',
})
export class GetTransactionsService {
  host = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getTransactions(date: string, type: string) {
    let url = '';

    if (date !== null && date !== undefined) {
      if (type !== null && type !== undefined) {
        url = `${this.host}/transaction?date_like=${date}&type=${type}`;
      } else {
        url = `${this.host}/transaction?date_like=${date}`;
      }
    } else {
      if (type !== null && type !== undefined) {
        url = `${this.host}/transaction?type=${type}`;
      } else {
        url = `${this.host}/transaction`;
      }
    }

    return this.httpClient.get(url).pipe(
      map((transaction: Array<Itransaction>) => {
        return transaction.map((tr) => {
          return tr;
        });
      })
    );
  }
}
