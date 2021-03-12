export interface NotificationManager {
  id?: number;
  userId?: number;
  notifications: [
    {
      icon: string;
      name: string;
      description: string;
    }
  ];
}
