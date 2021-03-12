export type NotificationStatus = 'success' | 'failure' | 'info';

export class NotificationItem {
  private static notificationCounter = 0;
  private static colors = new Map<NotificationStatus, string>([
    ['failure', 'red'],
    ['success', 'blue'],
    ['info', 'white'],
  ]);

  id: number;
  color = 'white';

  constructor(
    public text: string,
    public status: NotificationStatus = 'info',
    public timing: number = 5000
  ) {
    this.id = NotificationItem.notificationCounter++;
    this.color = NotificationItem.colors.get(status) || this.color;
  }
}
