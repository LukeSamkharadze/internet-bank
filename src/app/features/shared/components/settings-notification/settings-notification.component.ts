import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor() {}
  ngOnInit(): void {
    this.form = new FormGroup({
      productUpdates: new FormControl(false),
      offerUpdates: new FormControl(false),
      comments: new FormControl(true),
      notifications: new FormControl(true),
    });
  }
  onSubmit() {
    console.log(this.form.value);
  }
}
