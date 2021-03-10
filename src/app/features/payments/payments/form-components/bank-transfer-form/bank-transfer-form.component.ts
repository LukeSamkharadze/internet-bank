import { Component, OnDestroy, OnInit } from '@angular/core';
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
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CardService } from '../../../../shared/services/card.service';
import { UserService } from '../../../../shared/services/user.service';
import { Router } from '@angular/router';
import { NotificationItem } from '../../../../../shared/entity/notificationItem';
import { NotificationsManagerService } from '../../../../../shared/services/notifications-manager.service';

@Component({
  selector: 'app-bank-transfer-form',
  templateUrl: './bank-transfer-form.component.html',
  styleUrls: ['./bank-transfer-form.component.scss'],
  animations: [formAnimations.errorTrigger, formAnimations.formTrigger],
})
export class BankTransferFormComponent implements OnDestroy, OnInit {
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

  constructor(
    private paymentService: PaymentService,
    private cardService: CardService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationsManagerService
  ) {}

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
        currency: this.currency.value,
        beneficiary: this.beneficiary.value,
        bankTransferType: this.bankTransferType.value.toLowerCase(),
      };
      this.subscriptions.add(
        this.paymentService
          .bankTransfer(transfer)
          .pipe(
            tap(() => {
              this.router.navigate(['/payments']);
              this.form.reset();
              const notification = new NotificationItem(
                'Succesfull payment!',
                'success'
              );
              this.notificationService.add(notification);
            }),
            catchError((error) => {
              const notification = new NotificationItem(
                error.message,
                'failure'
              );
              this.notificationService.add(notification);
              return of(error);
            })
          )
          .subscribe()
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.toAccountNumber.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((val) => this.cardService.getCardByAccountNumber(val)),
        switchMap((card) => {
          if (card) {
            return this.userService.getById(card?.userId);
          } else {
            this.beneficiary.setValue('');
            return of(null);
          }
        }),
        tap((user) => {
          if (user) {
            this.beneficiary.setValue(user.fullname);
            this.beneficiary.markAsTouched();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
