import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.component.scss', './register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fullnamePattern = this.authService.fullnamePattern;
  emailPattern = this.authService.emailPattern;
  passwordPattern = this.authService.passwordPattern;

  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    terms: new FormControl(true),
  });

  get fullnameFormControl(): FormControl {
    return this.form.get('fullname') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get termsFormControl(): FormControl {
    return this.form.get('terms') as FormControl;
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Uppercase user's fullname
  makeFullnameUpperCase() {
    this.form
      .get('fullname')
      .setValue(this.form.get('fullname').value.toUpperCase());
  }

  onSubmit() {
    // Check if input email is unique
    if (this.authService.checkEmailUniqueness(this.emailFormControl.value)) {
      this.makeFullnameUpperCase();

      // User Form Value Destructuring (excludes 'terms' input)
      const { terms, ...user } = this.form.getRawValue();

      // Add user data on DB and reset form
      this.userService
        .create(user)
        .pipe(finalize(() => this.form.reset()))
        .subscribe();

      // Wait 1 sec after successful registration and redirect to 'Login'
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    } else {
      alert(
        `The email address '${this.emailFormControl.value}' has already been registered!\nPlease provide another email!`
      );
    }
  }

  ngOnInit(): void {}
}
