import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ICard } from '../interfaces/card.interface';
import { catchError, distinctUntilChanged, retry, tap } from 'rxjs/operators';

import { BaseHttpInterface } from '@shared/shared';

@Injectable({
  providedIn: 'root',
})
export class CardService implements BaseHttpInterface<ICard> {
  private cardsArr: ICard[] = [];

  private store = new BehaviorSubject<ICard[]>(this.cardsArr);

  public cards$ = this.store.pipe(distinctUntilChanged());

  public subj = new Subject<boolean>(); // ◄ ეს ხაზი ამოსაღებია

  constructor(private http: HttpClient) {
    this.getAll().subscribe((cards) =>
      this.store.next((this.cardsArr = cards))
    );
  }

  create(card: ICard): Observable<ICard> {
    card = this.determineIconPath(card);

    this.store.next((this.cardsArr = [...this.cardsArr, card]));

    return this.http.post<ICard>(`${environment.URL}cards`, card).pipe(
      retry(1),
      // ▼ ▼ ▼ ამის ქვევით მოსაშლელია ▼ ▼ ▼
      tap(() => {
        this.subj.next(true);
      }),
      // ▲ ▲ ▲ ამის ზევით მოსაშლელია ▲ ▲ ▲
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
    return this.http
      .get<ICard[]>(`${environment.URL}cards`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getById(id: number): Observable<ICard> {
    return EMPTY;
  }

  update(): Observable<ICard> {
    return EMPTY;
  }

  delete(): Observable<void> {
    return EMPTY;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // მომხმარებლის შეცდომა

      errorMessage = `Error: ${error.error.message}`;
    } else {
      // სერვერის შეცდომა

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
