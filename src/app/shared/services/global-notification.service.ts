import { Injectable } from '@angular/core';
import { SocketIoService } from '../../features/shared/services/socket-io.service';
import { tap } from 'rxjs/operators';
import { Transfer } from '../../features/shared/interfaces/transfers/transfer.interface';
import { NotificationItem } from '../entity/notificationItem';
import { NotificationsManagerService } from './notifications-manager.service';
import { TitleBlinkerService } from './title-blinker.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalNotificationService {
  constructor(
    private socketIo: SocketIoService,
    private notificationService: NotificationsManagerService
  ) {
    this.socketIo
      .listen('income')
      .pipe(
        tap((transfer: Transfer) => {
          const notification = new NotificationItem(
            `You received ${transfer.amount} USD!`,
            'info',
            3000
          );
          this.notificationService.add(notification, true);
        })
      )
      .subscribe();
  }
}
