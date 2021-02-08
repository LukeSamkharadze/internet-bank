import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feat-notification',
  templateUrl: './feat-notification.component.html',
  styleUrls: ['./feat-notification.component.scss'],
})
export class FeatNotificationComponent implements OnInit {
  successfulPay: boolean = true;
  unsuccessfulPay: boolean = true;
  bellNotifications: boolean = false;

  constructor() {}

  successfulPayMethod() {
    this.successfulPay = false;
    return this.successfulPay;
  }

  unsuccessfulPayMethod() {
    this.unsuccessfulPay = false;
    return this.unsuccessfulPay;
  }

  bellMethod() {
    this.bellNotifications = !this.bellNotifications;
    return this.bellNotifications;
  }
  ngOnInit(): void {}
}
