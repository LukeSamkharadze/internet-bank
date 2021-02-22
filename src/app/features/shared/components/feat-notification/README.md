Feature Notification
Use feature notification like this:

<app-feat-notification
[successfulPay]=""
[bellAppearance] =""
[newNotification]=""

> </app-feat-notification>

When `successfulPay` is true, successful pay notification is visible and when it false unsuccessful pay notification is visible. By default none of the notifications are visible.

When `bellAppearance` is true, bell icon is visible otherwise it's not.

When `newNotification` is true red dot appears top right corner of the bell icon.
