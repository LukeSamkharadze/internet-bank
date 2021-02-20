import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from './user-interface';

@Component({
  selector: 'app-shared-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements AfterViewInit {
  @ViewChild('myDropdown') myDropdown: ElementRef;
  @ViewChild('dropbtn') dropbtn: ElementRef;
  user: User;
  @Input() userName = 'Barry Armstrong';
  @Input() userMail = 'b.armstrong@gmail.com';
  @Input() userImage = './../../../../assets/header-profile/User.png';
  constructor(private authService: AuthService) {
    this.user = {
      name: this.userName,
      mail: this.userMail,
      image: this.userImage,
    };
  }

  ngAfterViewInit() {
    const myDrop = this.myDropdown.nativeElement;
    const dropb = this.dropbtn.nativeElement;
    myDrop.addEventListener('click', (e: MouseEvent) => this.stayOnDropdown(e));
    dropb.addEventListener('click', (e: MouseEvent) => myDrop.focus());
    document.addEventListener('click', (e: MouseEvent) =>
      myDrop.blur(this.hideElement(e))
    );
  }

  stayOnDropdown(event: MouseEvent) {
    event.stopPropagation();
  }

  myFunction() {
    this.myDropdown.nativeElement.classList.toggle('show');
  }

  hideElement(e) {
    if (!e.target.matches('.dropbtn')) {
      const myDropdown = document.getElementById('myDropdown');
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }

  signOut() {
    this.authService.logout();
  }
}
