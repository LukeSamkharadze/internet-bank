import { Component } from '@angular/core';
import { AuthService } from './features/shared/services/auth.service';
import { SocketIoService } from './features/shared/services/socket-io.service';
import { GlobalNotificationService } from './shared/services/global-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-project';
  constructor(
    private authService: AuthService,
    private socketIo: SocketIoService
  ) {
    if (this.authService.userId) {
      this.socketIo.emit('user_connected', this.authService.userId);
    }
  }
}
