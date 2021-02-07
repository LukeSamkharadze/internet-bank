import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../../../environments/environment.prod';
import { BalanceStructure } from '../models/balanceType';

@Injectable()
export class AccountBalancesService {
  private url: string = environment.URL;
  _BalanceStructures = new Subject<BalanceStructure[]>();

  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<BalanceStructure[]>(this.url + 'account-balances');
  }
}
