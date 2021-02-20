import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
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
import { Observable, Subscription } from 'rxjs';
import { SettingsAndMenuComponent } from '../settings-and-menu.component';
import { EventEmitter } from 'events';

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
  user: FormFields = {
    fullname: '',
    phone: NaN,
    email: ' ',
    language: '',
    sex: '',
    id: parseInt(localStorage.getItem('userId'), 10),
  };

  constructor(
    private fb: FormBuilder,
    private http: SettingsFormServiceService
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
      this.http.updateInfo(this.user).subscribe();
      alert('Updated Successfully');
    }
  }
  reset() {
    this.form.reset(this.userReplicate);
  }

  getUser() {
    this.getSub = this.http.getUserInfo(this.user.id).subscribe((value) => {
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
    this.http.deleteUser(this.user.id).subscribe();
    this.form.reset();
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
  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.updSub.unsubscribe();
    this.delSub.unsubscribe();
  }
}
