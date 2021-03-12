import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INotifications } from '../interfaces/notifications.interface';
import { map } from 'rxjs/operators';
import { AlertService } from '@core/alerts/alert.service';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  getUsers(): Observable<INotifications[]> {
    return this.http
      .get<INotifications[]>(`${environment.BaseUrl}notifications`)
      .pipe(
        map((users) => {
          return users;
        })
      );
  }
  updateNotifs(id: number, notifications: INotifications) {
    this.http
      .put(`${environment.BaseUrl}notifications/${id}`, notifications)
      .subscribe(
        (next) => {
          this.alertService.showSuccess('Settings Updated');
        },
        (error) => {
          this.alertService.showError(error.message);
        }
      );
  }
}
