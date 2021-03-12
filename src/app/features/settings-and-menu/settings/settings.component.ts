import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { SocketIoService } from '../../shared/services/socket-io.service';
import { PaymentLimitsService } from '../../shared/services/payment-limits.service';
import { takeUntil, tap } from 'rxjs/operators';
import { NotificationsManagerService } from '../../../shared/services/notifications-manager.service';
import { NotificationItem } from '../../../shared/entity/notificationItem';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject();
  showDeleteModal = false;
  passwordSave: string;

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
    private socketIo: SocketIoService,
    private limitService: PaymentLimitsService,
    private notificationsManagerService: NotificationsManagerService
  ) {
    this.getUser();

    this.socketIo
      .listen('profile')
      .pipe(
        takeUntil(this.unsubscriber),
        tap(() => {
          this.getUser();
        })
      )
      .subscribe();
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
      this.userService
        .update(this.user)
        .pipe(
          takeUntil(this.unsubscriber),
          tap(() => this.socketIo.emit('profile', this.auth.userId))
        )
        .subscribe();
      this.notificationsManagerService.add(
        new NotificationItem('Operation Succeeded', 'success')
      );
    }
  }

  reset() {
    this.form.reset(this.userReplicate);
  }

  getUser() {
    this.userService
      .getById(this.user.id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value) => {
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
    this.userService
      .delete(this.user.id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe();
    this.limitService
      .delete(this.user.id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe();
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
    this.unsubscriber.next();
  }
}
