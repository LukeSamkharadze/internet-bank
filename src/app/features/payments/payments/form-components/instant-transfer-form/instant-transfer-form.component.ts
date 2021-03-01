import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formAnimations } from '../../../../shared/animations';
import { InstantTransfer } from '../../../../shared/interfaces/transfers/instantTransfer.interface';
import { PaymentService } from '../../../services/payment.service';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-instant-transfer-form',
  templateUrl: './instant-transfer-form.component.html',
  styleUrls: ['./instant-transfer-form.component.scss'],
  animations: [formAnimations.errorTrigger, formAnimations.formTrigger],
})
export class InstantTransferFormComponent implements OnDestroy {
  title = 'Instant transfer';

  form = new FormGroup({
    fromAccount: new FormControl('', Validators.required),
    toAccountNumber: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
    instantTransferType: new FormControl('', Validators.required),
  });

  fromAccount: AbstractControl = this.form.get('fromAccount');
  toAccountNumber: AbstractControl = this.form.get('toAccountNumber');
  amount: AbstractControl = this.form.get('amount');
  instantTransferType: AbstractControl = this.form.get('instantTransferType');

  currentUsersCards = this.paymentService.currentUsersCards$;

  private subscriptions = new Subscription();

  constructor(private paymentService: PaymentService) {}

  onSubmit() {
    if (this.form.valid) {
      const transfer: InstantTransfer = {
        title: '', // will add in actual payment method.
        date: new Date(),
        type: 'instant',
        fromAccountUserId: this.fromAccount.value.userId,
        fromAccountNumber: this.fromAccount.value.accountNumber,
        amount: Number(this.amount.value),
        currency: 'USD', // rasvizamt moitana cxovrebam statikuri valutebi
        instantTransferType: this.instantTransferType.value.toLowerCase(),
        toAccountNumber: this.toAccountNumber.value,
      };
      this.subscriptions.add(
        this.paymentService
          .instantTransfer(transfer)
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
