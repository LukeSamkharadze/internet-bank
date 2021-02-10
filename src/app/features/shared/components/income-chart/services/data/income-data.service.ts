import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../../environments/environment.prod';
import { IncomeDataType } from './dataType';

@Injectable({
  providedIn: 'root',
})
export class IncomeDataService {
  private URL = environment.URL;
  constructor(private http: HttpClient) {}

  getAll(): Observable<IncomeDataType[]> {
    return this.http.get<IncomeDataType[]>(this.URL + 'income').pipe(
      map((value) => {
        return value;
      })
    );
  }
}
