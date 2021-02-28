import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  summaryAnimation,
  formAnimations,
} from '../../../../shared/animations';
import { PaymentService } from '../../../services/payment.service';
import { ElectronicTransfer } from '../../../../shared/interfaces/transfers/electronicTransfer.interface';
import { ProvidersService } from '../../../services/providers.service';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-electronic-payment-form',
  templateUrl: './electronic-payment-form.component.html',
  styleUrls: ['./electronic-payment-form.component.scss'],
  animations: [
    formAnimations.errorTrigger,
    formAnimations.formTrigger,
    summaryAnimation.summaryTrigger,
  ],
})
export class ElectronicPaymentFormComponent implements OnDestroy {
  title = 'Online payment';

  form = new FormGroup({
    fromAccount: new FormControl('', Validators.required),
    paymentSystem: new FormControl('', Validators.required),
    toAccountEmail: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
    currency: new FormControl('', Validators.required),
  });

  fromAccount: AbstractControl = this.form.get('fromAccount');
  paymentSystem: AbstractControl = this.form.get('paymentSystem');
  toAccountEmail: AbstractControl = this.form.get('toAccountEmail');
  amount: AbstractControl = this.form.get('amount');
  currency: AbstractControl = this.form.get('currency');

  currentUsersCards = this.paymentService.currentUsersCards$;

  paymentSystems$ = this.providersService.getElectronicPaymentProviders();

  private subscriptions = new Subscription();

  constructor(
    private paymentService: PaymentService,
    private providersService: ProvidersService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      const transfer: ElectronicTransfer = {
        title: '', // will add in actual payment method.
        date: new Date(),
        type: 'electronic',
        fromAccountNumber: this.fromAccount.value.accountNumber,
        fromAccountUserId: this.fromAccount.value.userId,
        toAccountEmail: this.toAccountEmail.value,
        paymentSystem: this.paymentSystem.value.title,
        amount: Number(this.amount.value),
        currency: this.currency.value,
      };
      this.subscriptions.add(
        this.paymentService
          .electronicTransfer(transfer)
          .pipe(
            tap(() => {
              alert('success');
              this.form.reset();
            }),
            catchError((error) => {
              alert(error);
              return of(error);
            })
          )
          .subscribe()
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  onReset() {
    this.form.reset();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
