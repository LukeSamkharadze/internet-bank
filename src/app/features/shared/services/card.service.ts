import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseHttpInterface } from '../../../shared/interfaces/base-http.interface';
import { ICard } from '../interfaces/card.interface';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CardService implements BaseHttpInterface<ICard> {
  constructor(private http: HttpClient) {}

  create(card: ICard): Observable<ICard> {
    card.iconPath = this.determineIconPath(card.cardNumber);
    return this.http
      .post<ICard>(`${environment.BaseUrl}cards`, card)
      .pipe(retry(1), catchError(this.handleError));
  }

  determineIconPath(cardNumber: number) {
    const firstDigit = String(cardNumber)[0];
    switch (firstDigit) {
      case '4':
        return './assets/create-card/create-card-visa-icon.svg';
      case '5':
        return './assets/create-card/mastercard.svg';
      default:
        return '';
    }
  }
  getAll(): Observable<ICard[]> {
    return this.http
      .get<ICard[]>(`${environment.BaseUrl}cards`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getById(): Observable<ICard> {
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
