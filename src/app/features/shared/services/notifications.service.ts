import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INotifications } from '../interfaces/notifications.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<INotifications[]> {
    return this.http.get<INotifications[]>(${environment.BaseUrl}notifications).pipe(
      map((users)=>{
        return users;
      })
    )
  }
  updateNotifs(id: number, notifications: INotifications): Observable<any> {
    return this.http.put<any>(
      ${environment.BaseUrl}notifications/${id},
      notifications
    );
  }
}