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
  // Fullname requirements: Only Latin letters and symbols (,.'-).
  fullnamePattern = /^[^\s]+( [^\s]+)+$/;
  // Email requirements: any valid email patern 'x@x.xx'.
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Password requirements: min 8 characters, numbers or symbols. Max 30 characters, numbers or symbols.
  passwordPattern = /^[A-Za-z\d#$@!%&*?]{8,30}$/;
  uniqueEmail: boolean;

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
    this.uniqueEmail = this.authService.checkEmailUniqueness(
      this.emailFormControl.value
    );

    if (this.uniqueEmail) {
      this.makeFullnameUpperCase();

      // User Form Value Destructuring (excludes 'terms' input)
      const { terms, ...user } = this.form.getRawValue();

      // Add user data on DB and reset form
      this.userService
        .create(user)
        .pipe(finalize(() => this.form.reset()))
        .subscribe();

      // Wait 1 sec after succesful registration and redirect to 'Login'
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
