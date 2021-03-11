import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ILoginData } from '../interfaces/user.interface';
import { UserService } from './user.service';
import { SocketIoService } from './socket-io.service';
import { NotificationsManagerService } from 'src/app/shared/services/notifications-manager.service';
import { NotificationItem } from '../../../shared/entity/notificationItem';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Fullname requirements: Only Latin letters and symbols (,.'-).
  fullnamePattern = /^[^\s]+( [^\s]+)+$/;
  // Email requirements: any valid email patern 'x@x.xx'.
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Password requirements: min 8, max 50 characters, numbers or symbols.
  passwordPattern = /^[A-Za-z\d#$@!%&*?]{8,50}$/;

  get userId() {
    return localStorage.getItem('userId');
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private socketIo: SocketIoService,
    private notificationService: NotificationsManagerService
  ) {}

  // Check if User exists
  loginCheck(loginData: ILoginData) {
    return this.userService
      .getAll()
      .pipe(
        map((src) =>
          src.some(
            (user) =>
              user.email === loginData.email &&
              user.password === loginData.password
          )
        )
      );
  }

  // Retrieve registered user from DB
  login(loginData: ILoginData) {
    return this.userService
      .getAll()
      .pipe(map((objs) => objs.find((obj) => obj.email === loginData.email)));
  }

  // Check if User is logged in
  userIsLoggedIn(): boolean {
    return this.userId ? true : false;
  }

  // Check if email is already registered
  checkEmailUniqueness(email: string) {
    return this.userService
      .getAll()
      .pipe(map((src) => src.every((user) => user.email !== email)));
  }

  // Logging in a User
  loggingIn(loginData: ILoginData, rememberMe?: boolean) {
    // Check if a User exist
    this.loginCheck(loginData).subscribe((checkSuccess) => {
      if (checkSuccess) {
        this.login(loginData).subscribe((user) => {
          // Add 'User Id' on localStorage
          localStorage.setItem('userId', JSON.stringify(user.id));
          // Emit to socket
          this.socketIo.emit('user_connected', JSON.stringify(user.id));

          // When 'Remember Me' checked add 'User Email' on localStorage
          if (rememberMe) {
            localStorage.setItem('userEmail', user.email);
          }

          // Wait 0.2 sec after successful login and redirect to 'Dashboard'
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 200);
        });
      } else {
        this.notificationService.add(
          new NotificationItem(
            'Login data is wrong, please check again your "email" and "password"!',
            'failure',
            5000
          )
        );
      }
    });
  }

  // Remove user Id from localStorage on Logout and navigate to 'Login'
  logout() {
    this.socketIo.emit('logout', this.userId);
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
