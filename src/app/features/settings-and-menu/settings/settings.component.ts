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
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  useruna: FormFields = {
    firstName: '',
    lastName: '',
    phone: NaN,
    email: ' ',
    language: '',
    sex: '',
    id: 1,
  };

  constructor(
    private fb: FormBuilder,
    private http: SettingsFormServiceService
  ) {
    this.http.getUserInfo(1).subscribe((value) => {
      this.useruna = value;
      this.form.patchValue({
        firstName: this.useruna.firstName,
        lastName: this.useruna.lastName,
        email: this.useruna.email,
        phone: this.useruna.phone,
        language: this.useruna.language,
        sex: this.useruna.sex,
        id: this.useruna.id,
      });
    });
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
      phone: new FormControl('this.useruna.phone', [
        Validators.required,
        Validators.pattern('^(5)[0-9]{8}$'),
      ]),
      language: [''],
      sex: [''],
      id: [''],
    });
  }

  submit() {
    this.useruna = this.form.value;

    this.http
      .updateInfo(this.useruna)
      .subscribe(() => console.log(this.useruna));
  }
  reset() {
    this.form.reset({
      firstName: this.useruna.firstName,
      lastName: this.useruna.lastName,
      email: this.useruna.email,
      phone: this.useruna.phone,
      language: this.useruna.language,
      sex: this.useruna.sex,
      id: this.useruna.id,
    });
  }
}
