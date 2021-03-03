import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, retry, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../shared/services/auth.service';
import IChartItem, { IChartType } from '../models/chart-server-item.interface';

@Injectable()
export class AccountsListIncomeService {
  private readonly paths = new Map<IChartType, string>([
    ['card', 'cardCharts'],
    ['deposit', 'depositCharts'],
    ['loan', 'loanCharts'],
  ]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  getForUser(type: IChartType): Observable<IChartItem> {
    return this.http
      .get<IChartItem[]>(
        environment.BaseUrl +
          this.paths.get(type) +
          `?userId=${this.authService.userId}`
      )
      .pipe(
        retry(1),
        switchMap((charts) => charts),
        first()
      );
  }

  bias(data: number[], amount: number): number[] {
    const bias = amount / data[data.length - 1];
    data = data.map((num) => num * bias);
    return data;
  }
}
