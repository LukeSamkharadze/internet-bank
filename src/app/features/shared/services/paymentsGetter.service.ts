import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankTransfer } from '../interfaces/bankPayment.entity';
import { InstantTransfer } from '../interfaces/instantPaymententity';
import { ElectronicTransfer } from '../interfaces/electronicPayment.entity';
import { environment } from '../../../../environments/environment';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentsGetterService {
  constructor(private http: HttpClient) {}

  getById(
    paymentId: number
  ): Observable<BankTransfer[] | ElectronicTransfer[] | InstantTransfer[]> {
    return this.http.get<
      BankTransfer[] | InstantTransfer[] | ElectronicTransfer[]
    >(environment.BaseUrl + `payments?id=${paymentId}`);
  }

  getByAccountNumber(accountNumber: string) {
    const expenses = this.http.get<
      BankTransfer[] | InstantTransfer[] | ElectronicTransfer[]
    >(environment.BaseUrl + `payments?fromAccount=${accountNumber}`);

    const income = this.http.get<
      BankTransfer[] | InstantTransfer[] | ElectronicTransfer[]
    >(
      environment.BaseUrl + `payments?destinationAccountNumber=${accountNumber}`
    );

    return forkJoin([expenses, income]).pipe(
      map((results) => [...results[0], ...results[1]])
    );
  }

  getByUserId(userId: string) {
    const expenses = this.http.get<
      BankTransfer[] | InstantTransfer[] | ElectronicTransfer[]
    >(environment.BaseUrl + `payments?fromUserId=${userId}`);

    const income = this.http.get<
      BankTransfer[] | InstantTransfer[] | ElectronicTransfer[]
    >(environment.BaseUrl + `payments?destinationAccountUserId=${userId}`);

    return forkJoin([expenses, income]).pipe(
      map((results) => [...results[0], ...results[1]])
    );
  }

  // Feel free to add getter by another specific property of payment.
}
