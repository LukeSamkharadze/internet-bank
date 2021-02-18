import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.component.scss', './login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailPattern = this.authService.emailPattern;
  passwordPattern = this.authService.passwordPattern;

  loginData: {
    email: string;
    password: string;
  };

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(true),
  });

  get emailFormControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get rememberMeFormControl(): FormControl {
    return this.form.get('rememberMe') as FormControl;
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.rememberMe();
  }

  rememberMe() {
    setTimeout(() => {
      this.form.get('email').setValue(localStorage.getItem('userEmail'));
    });
  }

  onSubmit() {
    this.loginData = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    };

    if (this.authService.loginCheck(this.loginData)) {
      this.authService
        .login(this.loginData)
        .pipe(
          // Add 'User Id' on localStorage
          tap((loggedIn) =>
            localStorage.setItem('userId', JSON.stringify(loggedIn.userId))
          ),
          // When 'Remember Me' checked add 'User Email' on localStorage
          tap((loggedIn) => {
            if (this.rememberMeFormControl.value) {
              localStorage.setItem('userEmail', loggedIn.userEmail);
            }
          })
        )
        .subscribe();

      // Wait 0.2 sec after succesful login and redirect to 'Dashboard'
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 200);
    } else {
      alert(
        'Login data is wrong, please check again your "email" and "password"!'
      );
    }
  }
}
