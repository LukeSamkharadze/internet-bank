import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { NotificationManager } from '../interfaces/notificationsManager.interface';
import { catchError, retry, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationsManagerService {
  constructor(private http: HttpClient) {}

  appearance: boolean;
  defaultIcon = '../../../assets/feat-notifications/noIcon.svg ';
  newNotification: boolean;

  successfulPay(appearance) {
    if (appearance) {
      this.appearance = true;
    } else {
      this.appearance = false;
    }
  }

  successfulPayStatus() {
    return this.appearance;
  }

  getNotificationDb(): Observable<NotificationManager[]> {
    return this.http
      .get<NotificationManager[]>(`${environment.BaseUrl}bell-notifications`)
      .pipe(
        map((users) => {
          return users;
        })
      );
  }

  updateNotification(
    id: number,
    notifications: NotificationManager
  ): Observable<NotificationManager> {
    return this.http
      .post<any>(
        `${environment.BaseUrl}bell-notifications/${id}`,
        notifications
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
