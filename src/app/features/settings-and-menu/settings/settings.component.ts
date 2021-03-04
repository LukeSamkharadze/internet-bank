import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { SocketIoService } from '../../shared/services/socket-io.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  showDeleteModal = false;
  passwordSave: string;
  getSub: Subscription;
  updSub: Subscription;
  delSub: Subscription;

  delTrue = false;
  updTrue = false;
  userReplicate: IUser;
  form: FormGroup;
  user: IUser = {
    fullname: '',
    phone: NaN,
    email: ' ',
    language: '',
    sex: '',
    password: '',
    id: parseInt(this.auth.userId, 10),
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private socketIo: SocketIoService
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
      this.updTrue = true;
      this.updSub = this.userService.update(this.user).subscribe();
      window.alert('Updated Successfully');
      this.socketIo.emit('profile', this.auth.userId);
      this.getUser();
    }
  }
  reset() {
    this.form.reset(this.userReplicate);
  }

  getUser() {
    this.getSub = this.userService.getById(this.user.id).subscribe((value) => {
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
  deleteUser() {
    this.showDeleteModal = false;
    this.delTrue = true;
    this.delSub = this.userService.delete(this.user.id).subscribe();
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

  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    if (this.updTrue) {
      this.updSub.unsubscribe();
    }
    if (this.delTrue) {
      this.delSub.unsubscribe();
    }
  }
}
