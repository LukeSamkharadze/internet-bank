import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FormFields } from '../shared/interfaces/form.interface';

@Component({
  selector: 'app-settings-and-menu',
  templateUrl: './settings-and-menu.component.html',
  styleUrls: ['./settings-and-menu.component.scss'],
})
export class SettingsAndMenuComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: new FormControl('Barry', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      lastName: new FormControl('Armstrong', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(\\+995)[0-9]{9}$'),
      ]),
      language: ['English'],
      sex: ['Male'],
    });
  }

  submit() {
    console.log(this.form.value);
  }
  reset() {
    this.form.reset();
  }
}
