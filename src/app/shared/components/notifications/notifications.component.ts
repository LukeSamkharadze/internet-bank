import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsManagerService } from '../../services/notifications-manager.service';
import { NotificationItem } from '../../entity/notificationItem';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<NotificationItem[]> = this
    .notificationsManagerService.notifications$;

  constructor(
    private notificationsManagerService: NotificationsManagerService
  ) {}

  ngOnInit(): void {}

  closeNotification(id: number) {
    this.notificationsManagerService.remove(id);
  }
}
