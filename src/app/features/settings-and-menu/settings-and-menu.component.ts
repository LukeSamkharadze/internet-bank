import { Component, OnInit } from '@angular/core';
import { SettingsFormServiceService } from './services/settings-form-service.service';
@Component({
  selector: 'app-settings-and-menu',
  templateUrl: './settings-and-menu.component.html',
  styleUrls: ['./settings-and-menu.component.scss'],
})
export class SettingsAndMenuComponent implements OnInit {
  // id = parseInt(localStorage.getItem('id'));
  // სანამ ბალახაძე დაასრულებს მანამდე default id-ის მნიშვნელობას გამოვიყენებ

  id = 1;
  showContent = false;
  constructor(private http: SettingsFormServiceService) {}

  ngOnInit() {}

  deleteUser(id) {
    this.http.deleteUser(id).subscribe();
    this.showContent = false;
  }
}
