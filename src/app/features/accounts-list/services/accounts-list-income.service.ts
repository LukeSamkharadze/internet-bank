import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import IItem from '../models/chart-item.entity';

@Injectable()
export class AccountsListIncomeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IItem[]> {
    return this.http
      .get<IItem[]>(`${environment.BaseUrl}charts`)
      .pipe(retry(1));
  }
}
