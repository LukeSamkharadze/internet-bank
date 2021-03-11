import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseHttpInterface } from '../../../shared/interfaces/base-http.interface';
import { catchError, retry } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';
import { NotificationsManagerService } from '../../../shared/services/notifications-manager.service';
import { NotificationItem } from '../../../shared/entity/notificationItem';

@Injectable({
  providedIn: 'root',
})
export class UserService implements BaseHttpInterface<IUser> {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationsManagerService
  ) {}

  create(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(`${environment.BaseUrl}users`, user)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAll(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(`${environment.BaseUrl}users`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getById(id): Observable<IUser> {
    return this.http
      .get<IUser>(environment.BaseUrl + `users/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  update(user): Observable<IUser> {
    return this.http
      .put<IUser>(environment.BaseUrl + `users/${user.id}`, user)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(id): Observable<void> {
    return this.http
      .delete<void>(environment.BaseUrl + `users/${id}`)
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

    this.notificationService.add(
      new NotificationItem(errorMessage, 'failure', 3000)
    );

    return throwError(errorMessage);
  }
}
