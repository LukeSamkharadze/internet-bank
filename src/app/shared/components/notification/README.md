Notification

in order to use notification components it's necessary to use this -

"<app-shared-notification \*ngIf="appearance" (closePopup)="closePopup()" [color]="">Notification message</app-shared-notification>"

When `appearance` - true, notification is visible and when false, it disappears.

`[color]` input is for concrete style. You need to indicate `color` that can be one of the colors listed below.
By default, when using `[color]` like this - `[color]=""`, notification text color is grey with white background.

closePopup is an event that is emitted when (x) button is pressed on popup. closePopup() function should be a function that makes appearance variable false.

![Ui - Notifications](https://user-images.githubusercontent.com/70640139/107028931-a9cefe80-67c7-11eb-8c2e-3672c97b2d7f.jpg)
