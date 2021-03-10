import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { BaseHttpInterface } from '@shared/shared';

import { Invoice } from '../interfaces/invoice.interface';
import { SocketIoService } from './socket-io.service';
import { AuthService } from './auth.service';
import { NotificationsManagerService } from '../../../shared/services/notifications-manager.service';
import { NotificationItem } from '../../../shared/entity/notificationItem';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService implements BaseHttpInterface<Invoice> {
  constructor(
    private http: HttpClient,
    private socketIo: SocketIoService,
    private authService: AuthService,
    private notificationsManagerService: NotificationsManagerService
  ) {}

  create(invoice: Invoice): Observable<Invoice> {
    return this.http
      .post<Invoice>(`${environment.BaseUrl}invoices`, invoice)
      .pipe(retry(1), catchError(this.handleError));
  }

  emitToSocket() {
    this.socketIo.emit('invoice', { userId: this.authService.userId });
  }

  getAll(): Observable<Invoice[]> {
    return this.http
      .get<Invoice[]>(`${environment.BaseUrl}invoices`)
      .pipe(retry(1), catchError(this.handleError));
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

    this.notificationsManagerService.add(
      new NotificationItem(errorMessage, 'failure', 3000)
    );

    return throwError(errorMessage);
  }
}
