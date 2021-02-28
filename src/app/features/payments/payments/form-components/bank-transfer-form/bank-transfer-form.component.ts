import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formAnimations } from '../../../../shared/animations';
import { PaymentService } from '../../../services/payment.service';
import { BankTransfer } from '../../../../shared/interfaces/transfers/bankTransfer.interface';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-bank-transfer-form',
  templateUrl: './bank-transfer-form.component.html',
  styleUrls: ['./bank-transfer-form.component.scss'],
  animations: [formAnimations.errorTrigger, formAnimations.formTrigger],
})
export class BankTransferFormComponent implements OnDestroy {
  title = 'Bank transfer';

  form = new FormGroup({
    fromAccount: new FormControl('', Validators.required),
    toAccountNumber: new FormControl('', Validators.required),
    beneficiary: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z\\s]*$'),
    ]),
    amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
    currency: new FormControl('', Validators.required),
    bankTransferType: new FormControl('', Validators.required),
  });

  fromAccount: AbstractControl = this.form.get('fromAccount');
  toAccountNumber: AbstractControl = this.form.get('toAccountNumber');
  beneficiary: AbstractControl = this.form.get('beneficiary');
  amount: AbstractControl = this.form.get('amount');
  currency: AbstractControl = this.form.get('currency');
  bankTransferType: AbstractControl = this.form.get('bankTransferType');

  currentUsersCards = this.paymentService.currentUsersCards$;

  private subscriptions = new Subscription();

  constructor(private paymentService: PaymentService) {}

  onSubmit(): void {
    if (this.form.valid) {
      const transfer: BankTransfer = {
        title: '', // will add in actual payment method.
        toUserId: '', // will add in actual payment method.
        date: new Date(),
        type: 'bank',
        fromAccountUserId: this.fromAccount.value.userId,
        fromAccountNumber: this.fromAccount.value.accountNumber,
        toAccountNumber: this.toAccountNumber.value,
        amount: Number(this.amount.value),
        currency: this.currency.value as string,
        beneficiary: this.beneficiary.value as string,
        bankTransferType: this.bankTransferType.value as string,
      };
      this.subscriptions.add(
        this.paymentService
          .bankTransfer(transfer)
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
