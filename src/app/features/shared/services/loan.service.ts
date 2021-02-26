import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { BaseHttpInterface } from '@shared/shared';

import { environment } from '../../../../environments/environment';
import { ILoan, LoanType } from '../interfaces/loan.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoanService implements BaseHttpInterface<ILoan> {
  private readonly icons = new Map<LoanType, string>([
    ['Mortgage', 'lar la-building'],
    ['Consumer', 'las la-laptop'],
  ]);
  private readonly colors = new Map<LoanType, string>([
    ['Mortgage', 'green'],
    ['Consumer', 'blue'],
  ]);

  constructor(private http: HttpClient, private auth: AuthService) {}

  create(loan: ILoan): Observable<ILoan> {
    return EMPTY;
  }

  getAll(): Observable<ILoan[]> {
    const userId = this.auth.userId;
    return this.http
      .get<ILoan[]>(`${environment.BaseUrl}loans?userId=${userId}`)
      .pipe(retry(1));
  }

  getById(id: number): Observable<ILoan> {
    return this.http
      .get<ILoan>(`${environment.BaseUrl}loans/${id}`)
      .pipe(retry(1));
  }

  update(): Observable<ILoan> {
    return EMPTY;
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${environment.BaseUrl}loans/${id}`)
      .pipe(retry(1));
  }

  determineIcon(loan: ILoan): string {
    return this.icons.get(loan.type);
  }

  determineColor(loan: ILoan): string {
    return this.colors.get(loan.type);
  }
}
