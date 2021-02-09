import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-project';
  items = 100;
  perpage = 20;
  zd(ae) {
    console.log(ae);
  }
}
