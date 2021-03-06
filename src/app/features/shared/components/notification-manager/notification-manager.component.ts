import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  HostListener,
} from '@angular/core';
import { NotificationsManagerService } from '../../services/notifications-manager.service';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss'],
})
export class NotificationManagerComponent implements OnInit, OnChanges {
  @Input() bellAppearance: boolean;
  appearance = true;
  successfulPay: boolean;
  newNotification = true;
  bellNotifications = false;
  notifications: Array<object>;

  constructor(
    private notificationsService: NotificationsManagerService,
    private eref: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (!this.eref.nativeElement.contains(event.target)) {
      this.bellNotifications = false;
    }
  }

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
    this.newNotification = this.notificationsService.newNotification;
  }

  ngOnChanges(): void {
    this.successfulPay = this.notificationsService.successfulPayStatus();
  }
}
