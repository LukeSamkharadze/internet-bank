import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ICard } from '../interfaces/card.interface';
import { catchError, distinctUntilChanged, retry, tap } from 'rxjs/operators';

import { BaseHttpInterface } from '@shared/shared';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CardService implements BaseHttpInterface<ICard> {
  private cardsArr: ICard[] = [];

  private store$ = new BehaviorSubject<ICard[]>(this.cardsArr);

  public cards$ = this.store$.pipe(distinctUntilChanged());

  constructor(private http: HttpClient, private auth: AuthService) {
    this.updateStore();
  }

  create(card: ICard): Observable<ICard> {
    card = this.determineIconPath(card);

    return this.http.post<ICard>(`${environment.BaseUrl}cards`, card).pipe(
      tap((newCard) =>
        this.store$.next((this.cardsArr = [...this.cardsArr, newCard]))
      ),
      catchError(this.handleError)
    );
  }

  determineIconPath(card: ICard): ICard {
    const firstDigit = card.cardNumber[0];
    switch (firstDigit) {
      case '4':
        return {
          ...card,
          iconPath: './assets/create-card/create-card-visa-icon.svg',
          cardType: 'VISA',
        };
      case '5':
        return {
          ...card,
          iconPath: './assets/create-card/mastercard.svg',
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
      .pipe(retry(1), catchError(this.handleError));
  }

  private updateStore() {
    this.getAll().subscribe((cards) =>
      this.store$.next((this.cardsArr = cards))
    );
  }

  getCardByCardNumber(cardNumber: string) {
    return this.http
      .get<ICard[]>(environment.BaseUrl + `cards?cardNumber=${cardNumber}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCardByAccountNumber(accountNumber: string) {
    return this.http
      .get<ICard[]>(
        environment.BaseUrl + `cards?accountNumber=${accountNumber}`
      )
      .pipe(retry(1), catchError(this.handleError));
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
