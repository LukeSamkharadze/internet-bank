import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feat-notification',
  templateUrl: './feat-notification.component.html',
  styleUrls: ['./feat-notification.component.scss'],
})
export class FeatNotificationComponent implements OnInit {
  successfulPay: boolean = true;
  constructor() {}

  successfulPayMethod() {
    return this.successfulPay;
  }
  ngOnInit(): void {}
}
