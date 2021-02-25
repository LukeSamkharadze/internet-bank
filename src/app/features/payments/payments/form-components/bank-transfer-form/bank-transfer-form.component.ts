import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formAnimations } from '../../../../shared/animations';
import { PaymentService } from '../../../services/payment.service';
import { BankPayment } from '../../../../shared/interfaces/bankPayment.entity';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-bank-transfer-form',
  templateUrl: './bank-transfer-form.component.html',
  styleUrls: ['./bank-transfer-form.component.scss'],
  animations: [formAnimations.errorTrigger, formAnimations.formTrigger],
})
export class BankTransferFormComponent implements OnInit, OnDestroy {
  title = 'Bank transfer';
  form: FormGroup;
  currentUsersCards = this.paymentService.currentUsersCards$;
  private subscriptions = new Subscription();

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
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
  }

  onSubmit(): void {
    if (this.form.valid) {
      const transfer: BankPayment = {
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
  get beneficiary(): AbstractControl {
    return this.form.get('beneficiary');
  }

  // @ts-ignore
  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  // @ts-ignore
  get currency(): AbstractControl {
    return this.form.get('currency');
  }

  // @ts-ignore
  get bankTransferType(): AbstractControl {
    return this.form.get('bankTransferType');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
