import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reduce, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Itransaction } from '../interfaces/bank-transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class ExpenseTransactionsService {
  host = 'http://localhost:3000';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getIncomeTransactions() {
    return this.httpClient
      .get(`${this.host}/transaction?fromUser=${this.authService.userId}`)
      .pipe(
        map((transactions: Array<Itransaction>) => {
          return transactions.map((transaction) => {
            return transaction;
          });
        })
      );
  }
}
