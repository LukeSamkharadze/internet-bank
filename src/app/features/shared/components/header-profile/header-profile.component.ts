import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { User } from './user-interface';
@Component({
  selector: 'app-shared-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements AfterViewInit {
  @ViewChild('myDropdown') myDropdown: ElementRef;
  user: User;
  @Input() userName = 'Barry Armstrong';
  @Input() userGmail = 'b.armstrong@gmail.com';
  @Input() userImage = './../../../../assets/header-profile/User.png';
  constructor() {
    this.user = {
      name: this.userName,
      gmail: this.userGmail,
      image: this.userImage,
    };
  }

  ngAfterViewInit() {
    document.onclick = this.hideElement;
    const myDrop = this.myDropdown.nativeElement;
    myDrop.addEventListener('click', (e: MouseEvent) => this.stayOnDropdown(e));
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
}
