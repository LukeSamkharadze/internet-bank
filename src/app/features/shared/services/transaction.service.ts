import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transfer } from '../interfaces/transfer.entity';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  // returns all transactions made by/to user.
  getByUserId(userId: string): Observable<Transfer[]> {
    const expenses = this.http.get<Transfer[]>(
      environment.BaseUrl + `transactions?fromAccountUserId=${userId}`
    );

    const income = this.http.get<Transfer[]>(
      environment.BaseUrl + `transactions?toUserId=${userId}`
    );

    return forkJoin([expenses, income]).pipe(
      map((results) => [...results[0], ...results[1]])
    );
  }

  // returns all transactions made by/to account number.
  getByAccountNumber(accountNumber: string): Observable<Transfer[]> {
    const expenses = this.http.get<Transfer[]>(
      environment.BaseUrl + `transactions?fromAccountNumber=${accountNumber}`
    );

    const income = this.http.get<Transfer[]>(
      environment.BaseUrl + `transactions?toAccountNumber=${accountNumber}`
    );

    return forkJoin([expenses, income]).pipe(
      map((results) => [...results[0], ...results[1]])
    );
  }

  // returns online spendings of user.
  getOnlineSpendings(userId: string): Observable<Transfer[]> {
    const online = this.http.get<Transfer[]>(
      environment.BaseUrl +
        `transactions?fromAccountUserId=${userId}&type=online`
    );

    const electroic = this.http.get<Transfer[]>(
      environment.BaseUrl +
        `transactions?fromAccountUserId=${userId}&type=electronic`
    );

    return forkJoin([online, electroic]).pipe(
      map((results) => [...results[0], ...results[1]])
    );
  }

  // returns bank spendings of user.
  getBankSpendings(userId: string): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(
      environment.BaseUrl + `transactions?fromAccountUserId=${userId}&type=bank`
    );
  }

  // Feel free to add getter by another specific property of payment.
}
