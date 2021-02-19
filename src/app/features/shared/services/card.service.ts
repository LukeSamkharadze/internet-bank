import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseHttpInterface } from '../../../shared/interfaces/base-http.interface';
import { ICard } from '../interfaces/card.interface';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CardService implements BaseHttpInterface<ICard> {
  constructor(private http: HttpClient) {
  }

  create(card: ICard): Observable<ICard> {
    card = this.determineIconPath(card);
    return this.http
      .post<ICard>(`${environment.URL}cards`, card)
      .pipe(retry(1), catchError(this.handleError));
  }

  determineIconPath(card: ICard): ICard {
    const firstDigit = card.cardNumber[0];
    switch (firstDigit) {
      case '4':
        return { ...card, iconPath: './assets/create-card/create-card-visa-icon.svg', cardType: 'VISA' };
      case '5':
        return { ...card, iconPath: './assets/create-card/mastercard.svg', cardType: 'MASTERCARD' };
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
