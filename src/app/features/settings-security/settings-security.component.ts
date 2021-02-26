import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { IUser } from '../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-settings-security',
  templateUrl: './settings-security.component.html',
  styleUrls: ['./settings-security.component.scss'],
  providers: [UserService],
})
export class SettingsSecurityComponent implements OnInit {
  formChange: FormGroup;
  userid: string;
  user$: Observable<IUser>;
  user;
  constructor(
    private userServise: UserService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.formChange = new FormGroup({
      curentPass: new FormControl('', [
        Validators.minLength(7),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      newPass: new FormControl('', [
        Validators.minLength(7),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
    });
    this.userid = this.authservice.userId;
    this.user$ = this.userServise.getById(this.userid);
    this.user$.subscribe((value) => {
      this.user = value;
    });
  }

  onSubmit() {
    console.log(this.user);

    if (this.user.password === this.formChange.get('curentPass').value)
      this.user.password = this.formChange.get('newPass').value;

    this.userServise.update(this.user).subscribe();

    console.log(this.user);
  }

  reset() {
    this.formChange.reset();
  }
}
