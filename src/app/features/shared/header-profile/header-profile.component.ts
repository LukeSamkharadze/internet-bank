import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements OnInit {
  @Input() userName = 'Barry Armstrong';
  @Input() userGmail = 'b.armstrong@gmail.com';
  @Input() userImage = './../../../../assets/header-profile/User.png';
  constructor() {}

  ngOnInit(): void {
    document.onclick = this.hideElement;
    const myDropdown = document.getElementById('myDropdown');
    myDropdown.addEventListener('click', (e: MouseEvent) =>
      this.stayOnDropdown(e)
    );
  }
  stayOnDropdown(event: MouseEvent) {
    event.stopPropagation();
  }
  myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
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
