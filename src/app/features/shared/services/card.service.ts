import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { CardType, ICard } from '../interfaces/card.interface';
import { catchError, distinctUntilChanged, retry, tap } from 'rxjs/operators';

import { BaseHttpInterface } from '@shared/shared';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CardService implements BaseHttpInterface<ICard> {
  private readonly colors = new Map<CardType, string>([
    ['VISA', 'blue'],
    ['MASTERCARD', 'orange'],
  ]);

  private cardsArr: ICard[] = [];

  private store$ = new BehaviorSubject<ICard[]>(this.cardsArr);

  public cards$ = this.store$.pipe(distinctUntilChanged());

  public subj = new Subject<boolean>(); // ◄ ეს ხაზი ამოსაღებია

  constructor(private http: HttpClient, private auth: AuthService) {
    this.updateStore();
  }

  create(card: ICard): Observable<ICard> {
    card = this.determineIconPath(card);

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

  determineIconPath(card: ICard, solid: boolean = false): ICard {
    const firstDigit = card.cardNumber[0];
    switch (firstDigit) {
      case '4':
        return {
          ...card,
          iconPath: !solid
            ? './assets/features/card-view/visa-logo.svg'
            : './assets/features/card-view/visa-solid.svg',
          cardType: 'VISA',
        };
      case '5':
        return {
          ...card,
          iconPath: './assets/features/card-view/master-card.svg',
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
    return this.http
      .get<ICard>(`${environment.BaseUrl}cards/${id}`)
      .pipe(retry(1));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${environment.BaseUrl}cards/${id}`)
      .pipe(retry(1), catchError(this.handleError));
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
}
