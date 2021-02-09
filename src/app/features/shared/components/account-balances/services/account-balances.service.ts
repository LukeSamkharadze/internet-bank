import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { BalanceStructure } from '../models/balanceType';

@Injectable()
export class AccountBalancesService {
  id;
  BalanceStructures = new Subject<BalanceStructure>();

  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<BalanceStructure>(
      environment.URL + 'cards/' + this.id
    );
  }
}
