import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['../authentication.component.scss', './recover.component.scss'],
})
export class RecoverComponent implements OnInit {
  emailPattern = this.authService.emailPattern;

  constructor(private authService: AuthService, private router: Router) {}

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  get emailFormControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  onSubmit() {
    // Check if input email is registered in Database
    if (!this.authService.checkEmailUniqueness(this.emailFormControl.value)) {
      alert(
        `Request Success!\nRecover password has been sent on the email: ${this.emailFormControl.value}`
      );
      // Redirect to 'Login' only if recover request was successful
      this.router.navigate(['/login']);
    } else {
      alert(
        `Account under the email '${this.emailFormControl.value}' does not exist!\nPlease check your email!`
      );
    }
  }

  ngOnInit(): void {}
}
