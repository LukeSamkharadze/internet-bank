import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reduce, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
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
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getTransactions(date: string, type: string) {
    let url = '';

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
        url = `${this.host}/transaction?userId=${this.authService.userId}`;
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
