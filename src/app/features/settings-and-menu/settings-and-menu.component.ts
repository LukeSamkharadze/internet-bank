import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SettingsFormServiceService } from './services/settings-form-service.service';
import { SettingsComponent } from './settings/settings.component';
@Component({
  selector: 'app-settings-and-menu',
  templateUrl: './settings-and-menu.component.html',
  styleUrls: ['./settings-and-menu.component.scss'],
})
export class SettingsAndMenuComponent implements OnInit {
  // id = parseInt(localStorage.getItem('id'));
  // სანამ ბალახაძე დაასრულებს მანამდე default id-ის მნიშვნელობას გამოვიყენებ

  id = 1;

  constructor(private http: SettingsFormServiceService) {}

  ngOnInit() {}
}
