import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reduce, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface Itransaction {
  id: 1;
  title: string;
  img: string;
  type: string;
  amount: string;
  date: string;
  status: string;
  tagColor: string;
  cardNUmber: number;
}

@Injectable({
  providedIn: 'root',
})
export class GetTransactionsService {
  host = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getTransactions() {
    return this.httpClient.get(`${this.host}/transaction`).pipe(
      map((transaction: Array<Itransaction>) => {
        return transaction.map((tr) => {
          return tr;
        });
      })
    );
  }
}
