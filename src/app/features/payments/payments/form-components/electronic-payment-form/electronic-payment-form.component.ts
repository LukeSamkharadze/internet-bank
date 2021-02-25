import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ElectronicPayment } from '../../../../shared/interfaces/electronicPayment.entity';
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
export class ElectronicPaymentFormComponent implements OnInit, OnDestroy {
  title = 'Online payment';
  form: FormGroup;
  currentUsersCards = this.paymentService.currentUsersCards$;
  paymentSystems$ = this.providersService.getElectronicPaymentProviders();
  private subscriptions = new Subscription();

  constructor(
    private paymentService: PaymentService,
    private providersService: ProvidersService
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      fromAccount: new FormControl('', Validators.required),
      paymentSystem: new FormControl('', Validators.required),
      toAccountEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
      currency: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const transfer: ElectronicPayment = {
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
          .electronicOrInstantTransfer(transfer)
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
  //

  // getters
  // @ts-ignore
  get fromAccount(): AbstractControl {
    return this.form.get('fromAccount');
  }

  // @ts-ignore
  get paymentSystem(): AbstractControl {
    return this.form.get('paymentSystem');
  }

  // @ts-ignore
  get toAccountEmail(): AbstractControl {
    return this.form.get('toAccountEmail');
  }

  // @ts-ignore
  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  // @ts-ignore
  get currency(): AbstractControl {
    return this.form.get('currency');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
