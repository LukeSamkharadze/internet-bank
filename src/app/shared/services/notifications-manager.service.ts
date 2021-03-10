import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { NotificationItem } from '../entity/notificationItem';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationsManagerService {
  private $notifications = new BehaviorSubject<NotificationItem[]>([]);
  notifications$ = this.$notifications.asObservable();

  constructor() {}

  add(notification: NotificationItem, save: boolean = false) {
    this.$notifications.next([...this.$notifications.value, notification]);

    timer(notification.timing)
      .pipe(tap((_) => this.remove(notification.id)))
      .subscribe();

    if (save) {
      // TODO call profile notifications add function
    }
  }

  remove(id: number) {
    this.$notifications.next(
      this.$notifications.value.filter((item) => item.id !== id)
    );
  }
}
