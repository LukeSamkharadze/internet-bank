import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  HostListener,
} from '@angular/core';
import { NotificationManagerService } from '../../services/notification-manager.service';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { NotificationManager } from '../../interfaces/notificationsManager.interface';
import { NotificationsManagerService } from 'src/app/shared/services/notifications-manager.service';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss'],
})
export class NotificationManagerComponent implements OnInit {
  @Input() bellAppearance = true;
  appearance = true;
  successfulPay: boolean;
  newNotification = false;
  bellNotifications = false;
  notifications: Array<NotificationManager> = [];
  userId = parseInt(this.auth.userId, 10);

  constructor(
    private notificationsService: NotificationManagerService,
    private notification: NotificationsManagerService,
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
}
