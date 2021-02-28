import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss'],
})
export class NotificationManagerComponent implements OnInit {
  appearance: boolean = true;
  @Input() successfulPay: boolean;
  @Input() bellAppearance: boolean;
  @Input() newNotification: boolean = true;
  bellNotifications: boolean = false;
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
    this.notificationsService.addNotification(
      '../../../assets/feat-notifications/notification-icon-1.svg',
      'Advertise Advertise Advertise',
      'How many free autoresponders have'
    );
  }
}
