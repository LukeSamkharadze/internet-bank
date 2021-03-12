import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, retry, switchMap, take } from 'rxjs/operators';
import { SecretQuestion } from '../interfaces/secretQuestion.interface';
import { NotificationItem } from '../../../shared/entity/notificationItem';
import { NotificationsManagerService } from '../../../shared/services/notifications-manager.service';

@Injectable({
  providedIn: 'root',
})
export class SecretQuestionService {
  constructor(
    private http: HttpClient,
    private notificationsManagerService: NotificationsManagerService
  ) {}

  getAll(): Observable<SecretQuestion[]> {
    return this.http
      .get<SecretQuestion[]>(`${environment.BaseUrl}questions`)
      .pipe(retry(1), catchError(this.handleError));
  }

  create(answer: SecretQuestion): Observable<SecretQuestion> {
    return this.http
      .post<SecretQuestion>(`${environment.BaseUrl}answers`, answer)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAnswerByQuestionId(userId, questionId): Observable<SecretQuestion> {
    return this.http
      .get<SecretQuestion[]>(
        environment.BaseUrl +
          `answers?userId=${userId}&questionId=${questionId}`
      )
      .pipe(
        retry(1),
        switchMap((val) => from(val)),
        take(1),
        catchError(this.handleError)
      );
  }

  update(answer): Observable<SecretQuestion> {
    return this.http
      .put<SecretQuestion>(environment.BaseUrl + `answers/${answer.id}`, answer)
      .pipe(retry(1), catchError(this.handleError));
  }

  getById(id): Observable<SecretQuestion> {
    return this.http
      .get<SecretQuestion>(environment.BaseUrl + `answers/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }
  getByUserId(id): Observable<SecretQuestion[]> {
    return this.http
      .get<SecretQuestion[]>(environment.BaseUrl + `answers?userId=${id}`)
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

    this.notificationsManagerService.add(
      new NotificationItem(errorMessage, 'failure', 3000)
    );

    return throwError(errorMessage);
  }
}
