import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-shared-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements AfterViewInit, OnInit {
  @ViewChild('userDropdownMenu') userDropdownMenu: ElementRef;
  @ViewChild('dropbtn') dropbtn: ElementRef;

  user = {
    fullname: '',
    email: '',
    image: './assets/header-profile/default-user.png',
  };
  status = false;
  click = 0;
  userId;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = this.authService.userId;
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
          setTimeout(() => {
            dropdown.classList.remove('show');
          }, 209);
          setTimeout(() => {
            dropdown.classList.toggle('hide');
          }, 300);
          dropdown.classList.toggle('visuallyHidden');
          this.clickEvent();
          this.click = 0;
        }
      }
      if (target.matches('.dropbtn')) {
        this.click++;
        if (this.click === 2) {
          setTimeout(() => {
            dropdown.classList.remove('show');
          }, 209);
          setTimeout(() => {
            dropdown.classList.toggle('hide');
          }, 300);
          dropdown.classList.toggle('visuallyHidden');
          this.click = 0;
        }
      }
    });
  }

  stayOnDropdown(event: MouseEvent) {
    event.stopPropagation();
  }

  showDropdown() {
    this.userDropdownMenu.nativeElement.classList.toggle('show');
    this.userDropdownMenu.nativeElement.classList.remove('hide');
    this.userDropdownMenu.nativeElement.classList.remove('visuallyHidden');
  }

  hideDropdown() {
    setTimeout(() => {
      this.userDropdownMenu.nativeElement.classList.remove('show');
    }, 209);
    setTimeout(() => {
      this.userDropdownMenu.nativeElement.classList.toggle('hide');
    }, 300);
    this.userDropdownMenu.nativeElement.classList.toggle('visuallyHidden');
    this.clickEvent();
    this.click = 0;
  }

  clickEvent() {
    this.status = !this.status;
  }
  clickDropdown() {
    this.clickEvent();
    this.showDropdown();
  }
  signOut() {
    this.authService.logout();
  }
}
