export interface INotifications {
  id?: number;
  userId: number;
  productUpdates: boolean;
  offerUpdates: boolean;
  comments: boolean;
  notifications: boolean;
}