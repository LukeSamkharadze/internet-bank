import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formAnimations } from '../../../../shared/animations';
import { InstantPayment } from '../../../../shared/interfaces/instantPaymententity';
import { PaymentService } from '../../../services/payment.service';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-instant-transfer-form',
  templateUrl: './instant-transfer-form.component.html',
  styleUrls: ['./instant-transfer-form.component.scss'],
  animations: [formAnimations.errorTrigger, formAnimations.formTrigger],
})
export class InstantTransferFormComponent implements OnInit, OnDestroy {
  title = 'Instant transfer';
  form: FormGroup;
  currentUsersCards = this.paymentService.currentUsersCards$;
  private subscriptions = new Subscription();

  constructor(private paymentService: PaymentService) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      fromAccount: new FormControl('', Validators.required),
      toAccountNumber: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
      instantTransferType: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const transfer: InstantPayment = {
        title: '', // will add in actual payment method.
        date: new Date(),
        type: 'instant',
        fromAccountUserId: this.fromAccount.value.userId,
        fromAccountNumber: this.fromAccount.value.accountNumber,
        amount: Number(this.amount.value),
        currency: 'USD', // rasvizamt moitana cxovrebam statikuri valutebi
        instantTransferType: this.instantTransferType.value,
        toAccountNumber: this.toAccountNumber.value,
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
  // getters
  // @ts-ignore
  get fromAccount(): AbstractControl {
    return this.form.get('fromAccount');
  }

  // @ts-ignore
  get toAccountNumber(): AbstractControl {
    return this.form.get('toAccountNumber');
  }

  // @ts-ignore
  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  // @ts-ignore
  get instantTransferType(): AbstractControl {
    return this.form.get('instantTransferType');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
