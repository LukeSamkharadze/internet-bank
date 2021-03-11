import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  retry,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BaseHttpInterface } from '../../../shared/interfaces/base-http.interface';
import IBgColor from '../interfaces/background-color.interface';
import { DepositType, IDeposit } from '../interfaces/deposit.interface';
import { AuthService } from './auth.service';
import { BackgroundService } from './background.service';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root',
})
export class DepositService implements BaseHttpInterface<IDeposit> {
  private readonly BACKGROUND_DIRECTORY = './assets/cards/backgrounds/';
  private readonly icons = new Map<DepositType, string>([
    ['Cumulative', 'las la-piggy-bank'],
  ]);
  private readonly colors = new Map<DepositType, IBgColor>([
    ['Cumulative', 'orange'],
  ]);

  private store$ = new BehaviorSubject<IDeposit[]>([]);
  deposits$ = this.store$.pipe(distinctUntilChanged());

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private bgService: BackgroundService,
    private socketIo: SocketIoService
  ) {
    this.updateStore();

    this.socketIo
      .listen('delete-deposit')
      .pipe(
        tap(() => {
          this.updateStore();
        })
      )
      .subscribe();
  }

  updateStore(): void {
    this.getAll()
      .pipe(take(1))
      .subscribe((deposits) => this.store$.next(deposits));
  }

  create(param: IDeposit): Observable<IDeposit> {
    return EMPTY;
  }

  getAll(): Observable<IDeposit[]> {
    const userId = this.auth.userId;
    return this.http
      .get<IDeposit[]>(`${environment.BaseUrl}deposits?userId=${userId}`)
      .pipe(retry(1));
  }

  getById(id: number): Observable<IDeposit> {
    return this.http
      .get<IDeposit>(`${environment.BaseUrl}deposits/${id}`)
      .pipe(retry(1));
  }

  update(): Observable<IDeposit> {
    return EMPTY;
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.BaseUrl}deposits/${id}`).pipe(
      retry(1),
      tap(() => this.socketIo.emit('delete-deposit', this.auth.userId))
    );
  }

  determineIcon(deposit: IDeposit): string {
    return this.icons.get(deposit.type);
  }

  determineColor(deposit: IDeposit): string {
    return this.colors.get(deposit.type);
  }

  determineBackground(deposit: IDeposit): string {
    return this.bgService.getBackground(this.colors.get(deposit.type));
  }
}
