import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { NotificationItem } from '../entity/notificationItem';
import { tap } from 'rxjs/operators';
import { TitleBlinkerService } from './title-blinker.service';
import { NotificationManagerService } from '../../features/shared/services/notification-manager.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsManagerService {
  private $notifications = new BehaviorSubject<NotificationItem[]>([]);
  notifications$ = this.$notifications.asObservable();

  constructor(
    private titleBlinker: TitleBlinkerService,
    private notifManager: NotificationManagerService
  ) {}

  add(notification: NotificationItem, icon?: string) {
    this.$notifications.next([...this.$notifications.value, notification]);

    timer(notification.timing)
      .pipe(tap((_) => this.remove(notification.id)))
      .subscribe();

    if (icon) {
      this.notifManager
        .addNotification({
          title: notification.text,
          icon: `${icon}`,
        })
        .subscribe();
      this.titleBlinker.blink('New notification!');
    }
  }

  remove(id: number) {
    this.$notifications.next(
      this.$notifications.value.filter((item) => item.id !== id)
    );
  }
}
