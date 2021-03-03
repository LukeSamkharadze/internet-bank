import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { first, map, retry, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICard } from '../../shared/interfaces/card.interface';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { ILoan } from '../../shared/interfaces/loan.interface';
import { AuthService } from '../../shared/services/auth.service';
import { FormatterService } from '../../shared/services/formatter.service';
import IItem from '../models/chart-item.interface';
import IChartItem, { IChartType } from '../models/chart-server-item.interface';

@Injectable()
export class AccountsListIncomeService {
  private readonly paths = new Map<IChartType, string>([
    ['card', 'cardCharts'],
    ['deposit', 'depositCharts'],
    ['loan', 'loanCharts'],
  ]);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private formatService: FormatterService
  ) {}

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

  generateCardsChart(cards$: Observable<ICard[]>): Observable<IItem | null> {
    const cardsBalance$ = cards$.pipe(
      map((cards) =>
        cards.map((card) => card.balance || card.availableAmount || 0)
      ),
      map((cards) =>
        cards.length ? cards.reduce((acc, cur) => acc + cur, 0) : null
      )
    );
    const cardsChart$ = combineLatest([
      cardsBalance$,
      this.getForUser('card'),
    ]).pipe(
      map(([balance, chart]) =>
        balance
          ? ({
              title: 'Cards balance',
              value: balance,
              data: chart.data,
            } as IItem)
          : null
      )
    );
    return cardsChart$;
  }

  generateDepositChart(
    deposits$: Observable<IDeposit[]>
  ): Observable<IItem | null> {
    const deposit$ = deposits$.pipe(
      map((deposits) => (deposits.length ? deposits[0] : null))
    );
    const depositChart$ = combineLatest([
      deposit$,
      this.getForUser('deposit'),
    ]).pipe(
      map(([deposit, chart]) =>
        deposit
          ? ({
              title: `Deposit (${this.formatService.formatBalance(
                Math.floor(deposit.depositRate * 100),
                { currency: '%', toRight: true }
              )} Rate)`,
              value: deposit.balance,
              data: chart.data,
            } as IItem)
          : null
      )
    );
    return depositChart$;
  }

  generateLoansChart(loans$: Observable<ILoan[]>): Observable<IItem | null> {
    const loansBalance$ = loans$.pipe(
      map((loans) =>
        loans.map((loan) => (loan.balance || loan.paid || 0) - (loan.paid || 0))
      ),
      map((loans) =>
        loans.length ? loans.reduce((acc, cur) => acc + cur, 0) : null
      )
    );
    const loansChart$ = combineLatest([
      loansBalance$,
      this.getForUser('loan'),
    ]).pipe(
      map(([balance, chart]) =>
        balance
          ? ({
              title: 'Pending credit',
              value: balance,
              data: chart.data,
            } as IItem)
          : null
      )
    );
    return loansChart$;
  }
}
