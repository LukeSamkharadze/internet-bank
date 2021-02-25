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
import { TransferService } from '../../../services/transfer.service';
import { ElectronicTransfer } from '../../../../shared/interfaces/electronicTransfer.entity';
import { ProvidersService } from '../../../services/providers.service';
import { Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

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
  currentUsersCards = this.transferService.currentUsersCards$;
  paymentSystems$ = this.providersService.getElectronicPaymentProviders();
  private subscriptions = new Subscription();

  constructor(
    private transferService: TransferService,
    private providersService: ProvidersService
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      fromAccount: new FormControl('', Validators.required),
      paymentSystem: new FormControl('', Validators.required),
      destinationEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
      currency: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const transfer: ElectronicTransfer = {
        date: new Date(),
        paymentType: 'electronic',
        ...this.form.getRawValue(),
        fromUserId: this.fromAccount.value.userId,
        paymentSystem: this.paymentSystem.value.title,
        amount: Number(this.amount.value),
      };
      this.subscriptions.add(
        this.transferService
          .electronicTransfer(transfer)
          .pipe(
            tap(() => {
              alert('success');
              this.form.reset();
            }),
            switchMap(() => this.transferService.postTransactionToDb(transfer)),
            catchError((error) => {
              alert(error);
              return error;
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
  get destinationEmail(): AbstractControl {
    return this.form.get('destinationEmail');
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
