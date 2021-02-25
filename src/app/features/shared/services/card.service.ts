import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  from,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ICard } from '../interfaces/card.interface';
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

@Injectable({
  providedIn: 'root',
})
export class CardService implements BaseHttpInterface<ICard> {
  private cardsArr: ICard[] = [];

  private store$ = new BehaviorSubject<ICard[]>(this.cardsArr);

  public cards$ = this.store$.pipe(distinctUntilChanged());

  public subj = new Subject<boolean>(); // ◄ ეს ხაზი ამოსაღებია

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private iconService: IconService
  ) {
    this.updateStore();
  }

  create(card: ICard): Observable<ICard> {
    card = this.determineCardType(card);

    return this.http.post<ICard>(`${environment.BaseUrl}cards`, card).pipe(
      retry(1),
      // ▼ ▼ ▼ ამის ქვევით მოსაშლელია ▼ ▼ ▼
      tap(() => {
        this.subj.next(true);
      }),
      // ▲ ▲ ▲ ამის ზევით მოსაშლელია ▲ ▲ ▲
      tap((newCard) =>
        this.store$.next((this.cardsArr = [...this.cardsArr, newCard]))
      ),
      catchError(this.handleError)
    );
  }

  determineCardType(card: ICard): ICard {
    const firstDigit = card.cardNumber[0];
    switch (firstDigit) {
      case '4':
        return {
          ...card,
          cardType: 'VISA',
        };
      case '5':
        return {
          ...card,
          cardType: 'MASTERCARD',
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
          cards.map((card) => this.iconService.determineIconPath(card))
        ),
        retry(1),
        catchError(this.handleError)
      );
  }

  private updateStore() {
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
    return this.http
      .put<ICard>(environment.BaseUrl + `cards/${card.id}`, card)
      .pipe(
        retry(1),
        tap(() => this.updateStore()),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<ICard> {
    return EMPTY;
  }

  delete(): Observable<void> {
    return EMPTY;
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
}
