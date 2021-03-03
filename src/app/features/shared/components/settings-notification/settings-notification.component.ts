import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';
import { INotifications } from '../../interfaces/notifications.interface';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-settings-notification',
  templateUrl: './settings-notification.component.html',
  styleUrls: ['./settings-notification.component.scss'],
})
export class SettingsNotificationComponent implements OnInit {
  form: FormGroup;
  default = {
    productUpdates: false,
    offerUpdates: false,
    comments: true,
    notifications: true,
  };
  id = parseInt(this.auth.userId, 10);
  constructor(
    private notificationsService: NotificationsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      productUpdates: new FormControl(false),
      offerUpdates: new FormControl(false),
      comments: new FormControl(true),
      notifications: new FormControl(true),
    });
  }
  onSubmit() {
    const notifs: INotifications = this.form.value;

    this.notificationsService.updateNotifs(this.id, notifs).subscribe(
      (data) => console.log('success!', data),
      (error) => console.error('Error!', error)
    );
    console.log(this.form.value);
  }
}
