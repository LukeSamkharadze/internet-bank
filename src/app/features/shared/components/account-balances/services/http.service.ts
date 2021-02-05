import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BalanceStructure } from './balanceType';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url: string = `http://localhost:3000/`;
  _EmpStructures = new Subject<BalanceStructure[]>();

  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<BalanceStructure[]>(this.url + 'account-balances');
  }
}
