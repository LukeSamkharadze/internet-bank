Feature Notification
Use feature notification like this:

```HTMl
<app-notification-manager
[bellAppearance] =""
[newNotification]=""
> </app-notification-manager>
```

When `successfulPay` is true, successful pay notification is visible and when it false unsuccessful pay notification is visible. By default none of the notifications are visible.

When `bellAppearance` is true, bell icon is visible otherwise it's not.

When `newNotification` is true red dot appears top right corner of the bell icon.

Service: NotificationsService

method you can use:

1. NotificationsService.addNotification(imageURL,Name,Description);

you need to pass three parameters 1. `imageURL` (path to the image or svg) 2. `Name` (name of the notification) 3. `Description` (description of notification)
all of the parameters should be string.

2. NotificationsService.successfulPay();

you need to pass boolean value: `true` or `false`, if successfulPay is true then green notification will show up, if it is false orange notification will show up
