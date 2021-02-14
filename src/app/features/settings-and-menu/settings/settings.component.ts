import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FormFields } from '../../shared/interfaces/form.interface';
import { SettingsFormServiceService } from '../services/settings-form-service.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  useruna = {
    firstName: 'Barry',
    lastName: 'Armstrong',
    phone: 555123123,
    email: 'BarryaArmstrong@gmail.com',
    language: 'English',
    sex: 'Male',
  };
  users: Array<FormFields> = [];
  constructor(
    private fb: FormBuilder,
    private http: SettingsFormServiceService
  ) {
    this.http
      .getUserInfo()
      .pipe(map((value) => (this.users = value)))
      .subscribe();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: new FormControl(this.useruna.firstName, [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      lastName: new FormControl(this.useruna.lastName, [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      email: new FormControl(this.useruna.email, [
        Validators.email,
        Validators.required,
      ]),
      phone: new FormControl(this.useruna.phone, [
        Validators.required,
        Validators.pattern('^(5)[0-9]{8}$'),
      ]),
      language: [this.useruna.language],
      sex: [this.useruna.sex],
    });

    console.log(this.form.invalid);
  }
  getUser() {
    this.form.setValue({
      firstName: this.useruna.firstName,
      lastName: this.useruna.lastName,
      email: this.useruna.email,
      phone: this.useruna.phone,
      language: this.useruna.language,
      sex: this.useruna.sex,
    });
  }
  submit() {
    console.log(this.form.value);
  }
  reset() {
    this.form.reset();
  }
}
