import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { BaseHttpInterface } from '@shared/shared';

import { environment } from '../../../../environments/environment';
import { ILoan } from '../interfaces/loan.interface';

@Injectable({
  providedIn: 'root',
})
export class LoanService implements BaseHttpInterface<ILoan> {
  constructor(private http: HttpClient) {}

  create(card: ILoan): Observable<ILoan> {
    return EMPTY;
  }

  getAll(): Observable<ILoan[]> {
    return this.http.get<ILoan[]>(`${environment.URL}loans`).pipe(retry(1));
  }

  getById(id: number): Observable<ILoan> {
    return EMPTY;
  }

  update(): Observable<ILoan> {
    return EMPTY;
  }

  delete(): Observable<void> {
    return EMPTY;
  }
}
