import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feat-notification',
  templateUrl: './feat-notification.component.html',
  styleUrls: ['./feat-notification.component.scss'],
})
export class FeatNotificationComponent implements OnInit {
  appearance: boolean = true;
  @Input() successfulPay: boolean;
  @Input() bellAppearance: boolean;
  @Input() newNotification: boolean = true;
  bellNotifications: boolean = false;

  constructor() {}

  bellMethod() {
    this.bellNotifications = !this.bellNotifications;
    this.newNotification = false;
    return this.bellNotifications;
  }

  closePopup() {
    this.appearance = false;
  }

  ngOnInit(): void {}
}
