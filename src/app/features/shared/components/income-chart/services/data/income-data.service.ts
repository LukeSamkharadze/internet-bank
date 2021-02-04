import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../../environments/environment.prod';
import { incomeDataType } from './dataType';

@Injectable({
  providedIn: 'root',
})
export class IncomeDataService {
  private URL = environment.URL;
  constructor(private http: HttpClient) {}

  getAll(): Observable<incomeDataType[]> {
    return this.http.get<incomeDataType[]>(this.URL + 'income').pipe(
      map((value) => {
        return value;
      })
    );
  }
}
