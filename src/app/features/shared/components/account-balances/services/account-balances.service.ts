import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class AccountBalancesService {
  id;
  BalanceStructures = new Subject();

  constructor(private http: HttpClient) {}
  get() {
    console.log(environment.URL + 'cards/' + this.id);
    return this.http.get(environment.URL + 'cards/' + this.id);
  }
}
