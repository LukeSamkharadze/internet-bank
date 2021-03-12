import { Injectable } from '@angular/core';
import { SocketIoService } from '../../features/shared/services/socket-io.service';
import { tap } from 'rxjs/operators';
import { Transfer } from '../../features/shared/interfaces/transfers/transfer.interface';
import { NotificationItem } from '../entity/notificationItem';
import { NotificationsManagerService } from './notifications-manager.service';
import { IconService } from '../../features/shared/services/icon.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalNotificationService {
  constructor(
    private socketIo: SocketIoService,
    private notificationService: NotificationsManagerService,
    private iconService: IconService
  ) {
    this.socketIo
      .listen('income')
      .pipe(
        tap((transfer: Transfer) => {
          const notification = new NotificationItem(
            `You received ${transfer.amount} USD!`
          );
          const iconPath = iconService.determineTransfersIcon(transfer)
            .iconPath;
          this.notificationService.add(notification, iconPath);
        })
      )
      .subscribe();
  }
}
