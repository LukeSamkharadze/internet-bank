import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SettingsComponent } from './settings/settings.component';
@Component({
  selector: 'app-settings-and-menu',
  templateUrl: './settings-and-menu.component.html',
  styleUrls: ['./settings-and-menu.component.scss'],
})
export class SettingsAndMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
