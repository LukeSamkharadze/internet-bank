import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { formAnimations } from '../../shared/animations/formAnimation';
import { ILoginData } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.component.scss', './login.component.scss'],
  animations: [
    formAnimations.errorTrigger,
    formAnimations.formTrigger,
    formAnimations.formTrigger2,
  ],
})
export class LoginComponent implements OnInit {
  emailPattern = this.authService.emailPattern;
  passwordPattern = this.authService.passwordPattern;

  loginData: ILoginData;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(true),
  });

  emailFormControl = this.form.get('email');
  passwordFormControl = this.form.get('password');
  rememberMeFormControl = this.form.get('rememberMe');

  constructor(private authService: AuthService) {}

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

    this.authService.loggingIn(
      this.loginData,
      this.rememberMeFormControl.value
    );
  }
}
