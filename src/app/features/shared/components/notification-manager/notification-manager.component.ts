import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  HostListener,
} from '@angular/core';
import { NotificationsManagerService } from '../../services/notifications-manager.service';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { NotificationManager } from '../../interfaces/notificationsManager.interface';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss'],
})
export class NotificationManagerComponent implements OnInit, OnChanges {
  @Input() bellAppearance = true;
  appearance = true;
  successfulPay: boolean;
  newNotification = true;
  bellNotifications = false;
  notifications: Array<NotificationManager> = [];
  test: NotificationManager = {
    notifications: [
      {
        icon: '../assets/feat-notifications/notification-icon-5.svg',
        name: 'socool',
        description: 'dduee',
      },
    ],
  };
  userId = parseInt(this.auth.userId, 10);

  constructor(
    private notificationsService: NotificationsManagerService,
    private eref: ElementRef,
    private auth: AuthService
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

  allNoti() {
    document.getElementById('list').style.overflow = 'auto';
  }

  ngOnInit(): void {
    this.newNotification = this.notificationsService.newNotification;

    this.notificationsService
      .getNotificationDb()
      .pipe(
        map((users) => {
          for (const user of users) {
            if (this.userId === user.userId) {
              this.notifications.push(user);
            }
          }
        })
      )
      .subscribe();
  }

  ngOnChanges(): void {
    this.successfulPay = this.notificationsService.successfulPayStatus();
  }
}
