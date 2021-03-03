import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SocketIoService } from '../../services/socket-io.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shared-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent
  implements AfterViewInit, OnInit, OnDestroy {
  private unsubscriber = new Subject();
  @ViewChild('userDropdownMenu') userDropdownMenu: ElementRef;

  user = {
    fullname: 'Barry Armstrong',
    email: 'mail@mail.com',
    image: './assets/header-profile/default-user.png',
  };
  status = false;

  userId;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private socketIo: SocketIoService
  ) {}

  ngOnInit() {
    this.userId = this.authService.userId;
    this.loadUser();
    this.socketIo
      .listen('profile')
      .pipe(
        takeUntil(this.unsubscriber),
        tap(() => {
          this.loadUser();
        })
      )
      .subscribe();
  }

  loadUser() {
    this.userService.getById(this.userId).subscribe((user) => {
      this.user.fullname = user.fullname;
      this.user.email = user.email;
    });
  }
  ngAfterViewInit() {
    const dropdown = this.userDropdownMenu.nativeElement;
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (!target.matches('.dropbtn')) {
        if (dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
        }
      }
    });
  }

  stayOnDropdown(event: MouseEvent) {
    event.stopPropagation();
  }

  showDropdown() {
    this.userDropdownMenu.nativeElement.classList.toggle('show');
  }

  clickEvent() {
    this.status = !this.status;
  }

  signOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
  }
}
