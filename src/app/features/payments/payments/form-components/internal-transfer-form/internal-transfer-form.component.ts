import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formAnimations } from '../../../../shared/animations';
import { InternalTransfer } from '../../../../shared/interfaces/transfers/internalTransfer.interface';
import { PaymentService } from '../../../services/payment.service';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-instant-transfer-form',
  templateUrl: './internal-transfer-form.component.html',
  styleUrls: ['./internal-transfer-form.component.scss'],
  animations: [formAnimations.errorTrigger, formAnimations.formTrigger],
})
export class InternalTransferFormComponent implements OnDestroy {
  title = 'Internal transfer';

  form = new FormGroup({
    fromAccount: new FormControl('', Validators.required),
    toAccountNumber: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
    internalTransferType: new FormControl('', Validators.required),
  });

  fromAccount: AbstractControl = this.form.get('fromAccount');
  toAccountNumber: AbstractControl = this.form.get('toAccountNumber');
  amount: AbstractControl = this.form.get('amount');
  internalTransferType: AbstractControl = this.form.get('internalTransferType');

  currentUsersCards = this.paymentService.currentUsersCards$;

  private subscriptions = new Subscription();

  constructor(private paymentService: PaymentService) {}

  onSubmit() {
    if (this.form.valid) {
      const transfer: InternalTransfer = {
        title: '', // will add in actual payment method.
        date: new Date(),
        type: 'internal',
        fromAccountUserId: this.fromAccount.value.userId,
        fromAccountNumber: this.fromAccount.value.accountNumber,
        amount: Number(this.amount.value),
        currency: 'USD', // rasvizamt moitana cxovrebam statikuri valutebi
        internalTransferType: this.internalTransferType.value.toLowerCase(),
        toAccountNumber: this.toAccountNumber.value,
      };
      this.subscriptions.add(
        this.paymentService
          .internalTransfer(transfer)
          .pipe(
            tap(() => {
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
