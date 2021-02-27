import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IncomeOutcomeService {
  private URL = environment.BaseUrl;
  constructor(private http: HttpClient) {}
  totalIncome: BehaviorSubject<number> = new BehaviorSubject(0);
  getAll() {
    return this.http.get(this.URL + 'income').pipe(
      map((value) => {
        console.log(value);
        return value;
      })
    );
  }
}

// this.generateChartService.totalIncome
//       .pipe(
//         map((sum) => {
//           this.totalsum = sum;
//         })
//       )
//       .subscribe();
//   }
