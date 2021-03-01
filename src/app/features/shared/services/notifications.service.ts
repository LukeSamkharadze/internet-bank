import { Injectable } from '@angular/core';
import { string } from 'yargs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}

  notifications: { icon: string; name: string; description: string }[] = [
    {
      icon: '../../../assets/feat-notifications/notification-icon-1.svg',
      name: 'Advertise Advertise Advertise',
      description: 'How many free autoresponders have',
    },
    {
      icon: '../../../assets/feat-notifications/notification-icon-2.svg',
      name: 'Nailing It On The Head',
      description: 'Another title for this article can be',
    },
    {
      icon: '../../../assets/feat-notifications/notification-icon-3.svg',
      name: 'How To Boost Traffic Of Your Blog',
      description: 'What makes one logo better than',
    },
    {
      icon: '../../../assets/feat-notifications/notification-icon-4.svg',
      name: 'Search Engine Optimization',
      description: 'Adwords Keyword research',
    },
    {
      icon: '../../../assets/feat-notifications/notification-icon-5.svg',
      name: 'Branding Do You Know Who You Are',
      description: 'I have been questioned many people',
    },
  ];
  appearance: boolean;

  getNotification() {
    return this.notifications;
  }

  addNotification(icon: string, name: string, description: string) {
    this.notifications.push({
      icon,
      name,
      description,
    });
  }

  successfulPay(appearance) {
    if (appearance) {
      this.appearance = true;
    } else {
      this.appearance = false;
    }
  }

  successfulPayStatus() {
    return this.appearance;
  }
}
