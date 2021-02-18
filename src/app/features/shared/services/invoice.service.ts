import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BaseHttpInterface } from '../../../shared/interfaces/base-http.interface';
import { Invoice } from '../interfaces/invoice.interface';

@Injectable()
export class InvoiceService implements BaseHttpInterface<Invoice> {
  constructor(private http: HttpClient) {}

  create(invoice: Invoice): Observable<Invoice> {
    return this.http
      .post<Invoice>(`${environment.URL}invoice`, invoice)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAll(): Observable<Invoice[]> {
    return EMPTY;
  }

  getById(): Observable<Invoice> {
    return EMPTY;
  }

  update(): Observable<Invoice> {
    return EMPTY;
  }

  delete(): Observable<void> {
    return EMPTY;
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
