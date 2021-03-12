import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { NotificationManagerService } from '../../services/notification-manager.service';
import { AuthService } from '../../services/auth.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { NotificationManager } from '../../interfaces/notificationsManager.interface';
import { NotificationsManagerService } from 'src/app/shared/services/notifications-manager.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss'],
})
export class NotificationManagerComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject();
  @Input() bellAppearance = true;
  appearance = true;
  successfulPay: boolean;
  newNotification = false;
  bellNotifications = false;
  notifications: Array<NotificationManager> = [];
  userId = parseInt(this.auth.userId, 10);

  constructor(
    public notificationsService: NotificationManagerService,
    private notification: NotificationsManagerService,
    private auth: AuthService
  ) {
    this.notificationsService.notificationAdded
      .pipe(tap(() => this.loadNotifications(), takeUntil(this.unsubscriber)))
      .subscribe();
  }

  bellMethod() {
    this.bellNotifications = !this.bellNotifications;
    if (this.newNotification) {
      this.newNotification = false;
    }
  }

  closePopup() {
    this.appearance = false;
  }

  deleteNotif(id: number) {
    this.notificationsService.deleteNotif(id).subscribe((e) => {
      this.loadNotifications();
    });
  }

  allNoti() {
    document.getElementById('list').style.overflow = 'auto';
  }

  ngOnInit(): void {
    document.addEventListener('click', (e: MouseEvent) => {
      if (this.bellNotifications) {
        const notifs = document.getElementById('notifs');
        const target = e.target as HTMLDivElement;
        const bell = document.getElementById('bell');
        if (!notifs.contains(target) && !bell.contains(target)) {
          this.bellMethod();
        }
      }
    });
    this.loadNotifications(false);
  }

  loadNotifications(bell = true): void {
    if (bell) {
      if (!this.bellNotifications) {
        this.newNotification = true;
      }
    }
    this.notifications = [];
    this.notificationsService
      .getNotificationDb()
      .pipe(
        map((users) => {
          for (const user of users) {
            if (this.userId === user.userId) {
              this.notifications.push(user);
            }
          }
          this.notifications.reverse();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
  }
}
