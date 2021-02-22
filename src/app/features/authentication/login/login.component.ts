import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

    this.authService.loginCheck(this.loginData).subscribe((checkSuccess) => {
      if (checkSuccess) {
        this.authService.login(this.loginData).subscribe((user) => {
          // Add 'User Id' on localStorage
          localStorage.setItem('userId', JSON.stringify(user.id));

          // When 'Remember Me' checked add 'User Email' on localStorage
          if (this.rememberMeFormControl.value) {
            localStorage.setItem('userEmail', user.email);
          }

          // Wait 0.2 sec after successful login and redirect to 'Dashboard'
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 200);
        });
      } else {
        alert(
          'Login data is wrong, please check again your "email" and "password"!'
        );
      }
    });
  }
}
