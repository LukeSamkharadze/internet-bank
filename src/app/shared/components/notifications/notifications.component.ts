import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsManagerService } from '../../services/notifications-manager.service';
import { NotificationItem } from '../../entity/notificationItem';
import { slideInOut } from 'src/app/features/shared/animations/notificationAnimation';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [slideInOut],
})
export class NotificationsComponent {
  notifications$: Observable<NotificationItem[]> = this
    .notificationsManagerService.notifications$;

  constructor(
    private notificationsManagerService: NotificationsManagerService
  ) {}

  closeNotification(id: number) {
    this.notificationsManagerService.remove(id);
  }
}
