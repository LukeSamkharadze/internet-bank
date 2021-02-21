import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { EventEmitter } from 'events';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  @Output() delete = new EventEmitter();
  showContent = false;
  passwordSave: string;
  getSub: Subscription;
  updSub: Subscription;
  delSub: Subscription;

  userReplicate;
  form: FormGroup;
  user: IUser = {
    fullname: '',
    phone: NaN,
    email: ' ',
    language: '',
    sex: '',
    password: '',
    id: parseInt(localStorage.getItem('userId'), 10),
  };

  constructor(
    private fb: FormBuilder,
    private http: UserService,
    private route: Router,
    private auth: AuthService
  ) {
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
      phone: new FormControl('', [Validators.pattern('^(5)[0-9]{8}$')]),
      language: [''],
      sex: [''],
    });
  }

  submit() {
    if (!this.form.invalid) {
      const temp = this.user.id;
      this.user = this.form.value;
      this.user.id = temp;
      this.check();
      this.http.update(this.user).subscribe();
      window.alert('Updated Successfully');
      this.getUser();
    }
  }
  reset() {
    this.form.reset(this.userReplicate);
  }

  getUser() {
    this.getSub = this.http.getById(this.user.id).subscribe((value) => {
      this.user = value;
      this.passwordSave = this.user.password;
      const split = this.user.fullname.split(' ');

      this.form.patchValue({
        ...this.user,
        firstName: split[0],
        lastName: split[1],
      });
      this.userReplicate = this.form.value;
    });
  }
  deleteUser(id) {
    id = this.user.id;
    this.showContent = false;
    this.http.delete(this.user.id).subscribe();
    window.alert('Successfully Deleted');
    this.auth.logout();
  }
  check() {
    this.user.password = this.passwordSave;
    this.user.fullname =
      this.form.get('firstName').value + ' ' + this.form.get('lastName').value;
    delete this.user.firstName;
    delete this.user.lastName;
    if (!this.user.phone) {
      delete this.user.phone;
    }
    if (this.user.language == null || this.user.language === '') {
      delete this.user.language;
    }
    if (this.user.sex == null || this.user.sex === '') {
      delete this.user.sex;
    }
  }

  ngOnDestroy(): void {}
}
