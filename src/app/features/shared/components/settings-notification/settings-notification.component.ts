import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';
import { INotifications } from '../../interfaces/notifications.interface';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
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
  ) {
    this.form = new FormGroup({
      productUpdates: new FormControl(false),
      offerUpdates: new FormControl(false),
      comments: new FormControl(true),
      notifications: new FormControl(true),
    });
  }

  ngOnInit(): void {
    this.notificationsService.getUsers().pipe(
      map((users)=>{
        for(const user of users){
          if(this.id === user.userId){
            this.form.patchValue({
              productUpdates: user.productUpdates,
              offerUpdates: user.offerUpdates,
              comments: user.comments,
              notifications: user.notifications
            });
            break;
          }
        }
      })
    ).subscribe()
  }
  onSubmit() {
    const notifs: INotifications = this.form.value;

    this.notificationsService.updateNotifs(this.id, notifs).subscribe(
      (data) => console.log('success!', data),
      (error) => console.error('Error!', error)
    );
  }
}