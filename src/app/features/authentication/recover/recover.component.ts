import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { formAnimations } from '../../shared/animations/formAnimation';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['../authentication.component.scss', './recover.component.scss'],
  animations: [
    formAnimations.errorTrigger,
    formAnimations.formTrigger,
    formAnimations.formTrigger2,
  ],
})
export class RecoverComponent {
  emailPattern = this.authService.emailPattern;
  uniqueEmail: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  emailFormControl = this.form.get('email');

  onSubmit() {
    this.authService
      .checkEmailUniqueness(this.emailFormControl.value)
      .subscribe((uniqueEmail) => {
        if (!uniqueEmail) {
          alert(
            `Request Success!\nRecover password has been sent on the email: ${this.emailFormControl.value}`
          );
          // Redirect to 'Login' only if recover request was successful
          this.router.navigate(['/login']);
        } else {
          alert(
            `Request Failure!\nAccount under the email '${this.emailFormControl.value}' does not exist!\nPlease check your email!`
          );
        }
      });
  }
}
