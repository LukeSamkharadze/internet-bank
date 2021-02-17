import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FormFields } from '../../shared/interfaces/form.interface';
import { SettingsFormServiceService } from '../services/settings-form-service.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SettingsAndMenuComponent } from '../settings-and-menu.component';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @Output() delete = new EventEmitter();
  showContent = false;

  form: FormGroup;
  user: FormFields = {
    firstName: '',
    lastName: '',
    phone: NaN,
    email: ' ',
    language: '',
    sex: '',
    id: NaN,
  };
  id: 1;

  constructor(
    private fb: FormBuilder,
    private http: SettingsFormServiceService
  ) {
    // this.id = parseInt(localStorage.getItem('id'));

    // this.id is NaN so until it is set I will use default Id - 1

    this.getUser();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(5)[0-9]{8}$'),
      ]),
      language: [''],
      sex: [''],
      id: [''],
    });
  }

  submit() {
    if (!this.form.invalid) {
      this.user = this.form.value;
      this.http.updateInfo(this.user).subscribe(() => console.log(this.user));
    }
  }
  reset() {
    this.form.reset(this.user);
  }

  getUser() {
    this.http.getUserInfo(1).subscribe((value) => {
      this.user = value;
      console.log(1);
      this.form.patchValue(this.user);
    });
  }
  deleteUser(id) {
    this.showContent = false;
    this.http.deleteUser(id).subscribe();
    this.form.reset();
  }
}
