import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpInterface } from '../../../../../shared/interfaces/base-http.interface';
import { DataType } from './dataType';

@Injectable({
  providedIn: 'root',
})
export class IncomeDataService {
  private URL = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<DataType[]> {
    return this.http.get<DataType[]>(this.URL + 'income').pipe(
      map((value) => {
        return value;
      })
    );
  }

  getById(): Observable<DataType> {
    return;
  }

  create(): Observable<DataType> {
    return;
  }

  update(): Observable<DataType> {
    return;
  }

  delete(): Observable<void> {
    return;
  }
}
