import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reduce, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

interface Itransaction {
  id: number;
  title: string;
  img: string;
  type: string;
  typeId: number;
  transactionType: string;
  amount: string;
  date: string;
  status: string;
  tagColor: string;
  cardNumber: number;
}

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
      .get(
        `${this.host}/transaction?userId=${this.authService.userId}&transactionType=Expense`
      )
      .pipe(
        map((transactions: Array<Itransaction>) => {
          return transactions.map((transaction) => {
            return transaction;
          });
        })
      );
  }
}
