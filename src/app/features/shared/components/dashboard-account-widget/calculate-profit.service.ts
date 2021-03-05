import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Income } from './income';

@Injectable({
  providedIn: 'root',
})
export class CalculateProfitService {
  private URL = environment.BaseUrl;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Income[]> {
    return this.http.get<Income[]>(this.URL + 'income').pipe(
      map((value) => {
        return value;
      })
    );
  }
}
