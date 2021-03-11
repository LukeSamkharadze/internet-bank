import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ILimits } from '../../payment-limits/payment-interfaces';
import { AuthService } from '../../shared/services/auth.service';
import { PaymentLimitsService } from '../../shared/services/payment-limits.service';
import { UserService } from '../../shared/services/user.service';
import { formAnimations } from '../../shared/animations/formAnimation';
import { NotificationsManagerService } from '../../../shared/services/notifications-manager.service';
import { NotificationItem } from '../../../shared/entity/notificationItem';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.component.scss', './register.component.scss'],
  animations: [
    formAnimations.errorTrigger,
    formAnimations.formTrigger,
    formAnimations.formTrigger2,
  ],
})
export class RegisterComponent {
  fullnamePattern = this.authService.fullnamePattern;
  emailPattern = this.authService.emailPattern;
  passwordPattern = this.authService.passwordPattern;

  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    terms: new FormControl(true),
  });

  fullnameFormControl = this.form.get('fullname');
  emailFormControl = this.form.get('email');
  passwordFormControl = this.form.get('password');
  termsFormControl = this.form.get('terms');

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private userLimits: PaymentLimitsService,
    private notificationService: NotificationsManagerService
  ) {}

  // Uppercase user's fullname
  makeFullnameUpperCase() {
    this.form
      .get('fullname')
      .setValue(this.form.get('fullname').value.toUpperCase());
  }

  onSubmit() {
    // Check if input email is unique
    this.authService
      .checkEmailUniqueness(this.emailFormControl.value)
      .subscribe((uniqueEmail) => {
        if (uniqueEmail) {
          this.makeFullnameUpperCase();

          // User Form Value Destructuring (excludes 'terms' input)
          const { terms, ...regUser } = this.form.getRawValue();

          // Add user data on DB and reset form
          this.userService
            .create(regUser)
            .pipe(finalize(() => this.form.reset()))
            .subscribe((userData) => {
              // User Form Value Destructuring (excludes 'fullname' input)
              const { fullname, ...user } = userData;
              // Logging in a User and redirecting to 'Dashboard'
              this.authService.loggingIn(user);
            });

          // Add user limits on DB
          const limits: ILimits = {
            bankLimit: 5000,
            onlineLimit: 5000,
            cashLimit: 5000,
            id: regUser.id,
          };

          this.userLimits.createUserLimits(limits).subscribe();
        } else {
          this.notificationService.add(
            new NotificationItem(
              `The email address '${this.emailFormControl.value}' has already been registered!\nPlease provide another email!`,
              'failure',
              6000
            )
          );
        }
      });
  }
}
