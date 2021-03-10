import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Itransaction } from '../interfaces/bank-transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class IncomeTransactionsService {
  host = 'http://localhost:3000';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getIncomeTransactions() {
    return this.httpClient
      .get(`${this.host}/transaction?toUser=${this.authService.userId}`)
      .pipe(
        map((transactions: Array<Itransaction>) => {
          return transactions.map((transaction) => {
            return transaction;
          });
        })
      );
  }
}
