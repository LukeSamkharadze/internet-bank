export class NotificationItem {
  id: number;
  text: string;
  status: NotificationStatus;
  timing: number;
  color: string;

  constructor(text: string, status: NotificationStatus, timing: number) {
    this.text = text;
    this.status = status;
    this.timing = timing;
    this.id = Math.random();

    switch (status) {
      case 'failure':
        this.color = 'orange';
        break;
      case 'success':
        this.color = 'green';
        break;
      case 'info':
        this.color = 'blue';
        break;
    }
  }
}

export type NotificationStatus = 'success' | 'failure' | 'info';
