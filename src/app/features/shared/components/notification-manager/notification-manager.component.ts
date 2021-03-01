import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss'],
})
export class NotificationManagerComponent implements OnInit, OnChanges {
  appearance = true;
  @Input() successfulPay: boolean;
  @Input() bellAppearance: boolean;
  @Input() newNotification = true;
  bellNotifications = false;
  notifications: Array<object>;

  constructor(private notificationsService: NotificationsService) {}

  bellMethod() {
    this.bellNotifications = !this.bellNotifications;
    this.newNotification = false;
    return this.bellNotifications;
  }

  closePopup() {
    this.appearance = false;
  }

  ngOnInit(): void {
    this.notifications = this.notificationsService.getNotification();
  }

  ngOnChanges(): void {
    this.successfulPay = this.notificationsService.successfulPayStatus();
  }
}
