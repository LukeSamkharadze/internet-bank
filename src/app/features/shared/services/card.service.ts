import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { CardType, ICard } from '../interfaces/card.interface';
import {
  catchError,
  distinctUntilChanged,
  map,
  retry,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { BaseHttpInterface } from '@shared/shared';
import { AuthService } from './auth.service';
import { IconService } from './icon.service';
import { BackgroundService } from './background.service';
import IBgColor from '../interfaces/background-color.interface';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root',
})
export class CardService implements BaseHttpInterface<ICard> {
  private readonly colors = new Map<CardType, IBgColor>([
    ['visa', 'blue'],
    ['mastercard', 'orange'],
  ]);

  private cardsArr: ICard[] = [];

  private store$ = new BehaviorSubject<ICard[]>(this.cardsArr);

  public cards$ = this.store$.pipe(distinctUntilChanged());

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private iconService: IconService,
    private bgService: BackgroundService,
    private socketIo: SocketIoService
  ) {
    this.updateStore();
    this.socketIo
      .listen('transaction')
      .pipe(tap(() => this.updateStore()))
      .subscribe();

    this.socketIo
      .listen('new-card')
      .pipe(
        tap((card) => {
          this.store$.next(
            (this.cardsArr = [
              ...this.cardsArr,
              this.iconService.determineCardIcon(card),
            ])
          );
        })
      )
      .subscribe();
  }

  create(card: ICard): Observable<ICard> {
    card = this.determineCardType(card);
    return this.http.post<ICard>(`${environment.BaseUrl}cards`, card).pipe(
      retry(1),
      tap((newCard) => {
        this.store$.next(
          (this.cardsArr = [
            ...this.cardsArr,
            this.iconService.determineCardIcon(newCard),
          ])
        );
        this.socketIo.emit('new-card', { userId: this.auth.userId, newCard });
      }),
      catchError(this.handleError)
    );
  }

  determineCardType(card: ICard): ICard {
    const firstDigit = card.cardNumber[0];
    switch (firstDigit) {
      case '4':
        return {
          ...card,
          cardType: 'visa',
        };
      case '5':
        return {
          ...card,
          cardType: 'mastercard',
        };
      default:
        return { ...card };
    }
  }

  getAll(): Observable<ICard[]> {
    const userId = this.auth.userId;
    return this.http
      .get<ICard[]>(`${environment.BaseUrl}cards?userId=${userId}`)
      .pipe(
        map((cards) =>
          cards.map((card) => this.iconService.determineCardIcon(card))
        ),
        retry(1),
        catchError(this.handleError)
      );
  }

  updateStore() {
    this.getAll().subscribe((cards) =>
      this.store$.next((this.cardsArr = cards))
    );
  }

  getCardByCardNumber(cardNumber: string): Observable<ICard> {
    return this.http
      .get<ICard[]>(environment.BaseUrl + `cards?cardNumber=${cardNumber}`)
      .pipe(
        switchMap((cards) => from(cards)),
        take(1),
        retry(1),
        catchError(this.handleError)
      );
  }

  getCardByAccountNumber(accountNumber: string): Observable<ICard> {
    return this.http
      .get<ICard[]>(
        environment.BaseUrl + `cards?accountNumber=${accountNumber}`
      )
      .pipe(
        map((data) => data[0]),
        retry(1),
        catchError(this.handleError)
      );
  }

  update(card: ICard): Observable<ICard> {
    const updateCard = { ...card };
    delete updateCard.color;
    delete updateCard.iconPath;
    return this.http
      .put<ICard>(environment.BaseUrl + `cards/${updateCard.id}`, updateCard)
      .pipe(
        retry(1),
        tap(() => this.updateStore()),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<ICard> {
    return this.http.get<ICard>(`${environment.BaseUrl}cards/${id}`).pipe(
      map((card) => this.iconService.determineCardIcon(card)),
      retry(1)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.BaseUrl}cards/${id}`).pipe(
      retry(1),
      tap(() => this.updateStore()),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client Error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server Error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }

  determineColor(card: ICard): string {
    return this.colors.get(card.cardType);
  }

  determineBackground(card: ICard): string {
    return this.bgService.getBackground(this.colors.get(card.cardType));
  }
}
