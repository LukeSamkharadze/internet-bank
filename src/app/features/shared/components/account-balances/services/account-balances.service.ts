import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { BalanceStructure } from '../models/balanceType';

@Injectable()
export class AccountBalancesService {
  id;
  BalanceStructures = new Subject<any[]>();

  constructor(private http: HttpClient) {}
  get() {
    console.log(environment.URL + 'cards/' + this.id);
    return this.http.get<any[]>(environment.URL + 'cards/' + this.id);
  }
}
