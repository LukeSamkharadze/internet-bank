import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BaseHttpInterface } from '../../../shared/interfaces/base-http.interface';
import { IDeposit } from '../interfaces/deposit.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DepositService implements BaseHttpInterface<IDeposit> {
  private readonly icons = new Map<string, string>([
    ['Cumulative', 'las la-lock'],
  ]);
  private readonly colors = new Map<string, string>([['Cumulative', 'orange']]);

  constructor(private http: HttpClient, private auth: AuthService) {}

  create(param: IDeposit): Observable<IDeposit> {
    return EMPTY;
  }

  getAll(): Observable<IDeposit[]> {
    const userId = this.auth.userId;
    return this.http
      .get<IDeposit[]>(`${environment.BaseUrl}deposits?userId=${userId}`)
      .pipe(retry(1));
  }

  getById(id: number): Observable<IDeposit> {
    return this.http
      .get<IDeposit>(`${environment.BaseUrl}deposits/${id}`)
      .pipe(retry(1));
  }

  update(): Observable<IDeposit> {
    return EMPTY;
  }

  delete(): Observable<void> {
    return EMPTY;
  }

  determineIcon(deposit: IDeposit): string {
    return this.icons.get(deposit.type);
  }

  determineColor(deposit: IDeposit): string {
    return this.colors.get(deposit.type);
  }
}
