import { Injectable } from '@angular/core';
import { NotificationsManagerService } from '../../shared/services/notifications-manager.service';
import { NotificationItem } from '../../shared/entity/notificationItem';

@Injectable()
export class AlertService {
  constructor(private notificationsManage: NotificationsManagerService) {}

  showSuccess(message: string): void {
    this.notificationsManage.add(
      new NotificationItem(message, 'success', 2000)
    );
  }

  showError(message: string): void {
    this.notificationsManage.add(
      new NotificationItem(message, 'failure', 2000)
    );
  }
}
