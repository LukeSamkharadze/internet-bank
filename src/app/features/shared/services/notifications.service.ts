import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INotifications } from '../interfaces/notifications.interface';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  getById(id): Observable<INotifications> {
    return this.http.get<INotifications>(
      `${environment.BaseUrl}notifications/${id}`
    );
  }
  updateNotifs(id: number, notifications: INotifications): Observable<any> {
    return this.http.put<any>(
      `${environment.BaseUrl}notifications/${id}`,
      notifications
    );
  }
}
