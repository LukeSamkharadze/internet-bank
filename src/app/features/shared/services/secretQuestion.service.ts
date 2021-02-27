import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { SecretQuestion } from '../interfaces/secretQuestion.interface';

@Injectable({
  providedIn: 'root',
})
export class SecretQuestionsevise {
  constructor(private http: HttpClient) {}

  getAll(): Observable<SecretQuestion[]> {
    return this.http
      .get<SecretQuestion[]>(`${environment.BaseUrl}questions`)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // User error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
