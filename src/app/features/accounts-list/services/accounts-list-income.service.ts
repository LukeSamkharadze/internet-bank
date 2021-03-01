import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import IChartItem from '../models/chart-server-item.interface';

@Injectable()
export class AccountsListIncomeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IChartItem[]> {
    return this.http
      .get<IChartItem[]>(`${environment.BaseUrl}charts`)
      .pipe(retry(1));
  }
}
