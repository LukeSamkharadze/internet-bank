import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IncomeOutcomeService {
  private URL = environment.BaseUrl;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.URL + 'income').pipe(
      map((value) => {
        return value;
      })
    );
  }
}
