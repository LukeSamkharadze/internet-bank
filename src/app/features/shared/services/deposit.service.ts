import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BaseHttpInterface } from '../../../shared/interfaces/base-http.interface';
import { IDeposit } from '../interfaces/deposit.interface';

@Injectable({
  providedIn: 'root',
})
export class DepositService implements BaseHttpInterface<IDeposit> {
  constructor(private http: HttpClient) {}

  create(param: IDeposit): Observable<IDeposit> {
    return EMPTY;
  }

  getAll(): Observable<IDeposit[]> {
    return this.http
      .get<IDeposit[]>(`${environment.URL}deposits`)
      .pipe(retry(1));
  }

  getById(id: number): Observable<IDeposit> {
    return EMPTY;
  }

  update(): Observable<IDeposit> {
    return EMPTY;
  }

  delete(): Observable<void> {
    return EMPTY;
  }
}
