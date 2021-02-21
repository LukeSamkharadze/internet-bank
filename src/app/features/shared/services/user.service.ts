import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseHttpInterface } from '../../../shared/interfaces/base-http.interface';
import { catchError, retry } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements BaseHttpInterface<IUser> {
  constructor(private http: HttpClient) {}

  create(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(`${environment.URL}users`, user)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAll(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(`${environment.URL}users`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getById(id): Observable<IUser> {
    return this.http.get<IUser>(environment.URL + `users/${id}`);
  }

  update(user): Observable<IUser> {
    return this.http.put<IUser>(environment.URL + `users/${user.id}`, user);
  }

  delete(id): Observable<void> {
    return this.http.delete<void>(environment.URL + `users/${id}`);
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
