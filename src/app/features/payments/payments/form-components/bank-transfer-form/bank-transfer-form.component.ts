import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { formAnimations } from '../../../../shared/animations';
import { TransferService } from '../../../services/transfer.service';
import { BankTransfer } from '../../../../shared/interfaces/bankTransfer.entity';
import { Subscription } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-bank-transfer-form',
  templateUrl: './bank-transfer-form.component.html',
  styleUrls: ['./bank-transfer-form.component.scss'],
  animations: [formAnimations.errorTrigger, formAnimations.formTrigger],
})
export class BankTransferFormComponent implements OnInit, OnDestroy {
  title = 'Bank transfer';
  form: FormGroup;
  currentUsersCards = this.transferService.currentUsersCards$;
  private subscriptions = new Subscription();

  constructor(private transferService: TransferService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      fromAccount: new FormControl('', Validators.required),
      destinationAccountNumber: new FormControl('', Validators.required),
      beneficiary: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]*$'),
      ]),
      amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
      currency: new FormControl('', Validators.required),
      transferType: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const transfer: BankTransfer = {
        date: new Date(),
        paymentType: 'bank',
        fromUserId: this.fromAccount.value.userId,
        ...this.form.getRawValue(),
        amount: Number(this.amount.value),
      };
      this.subscriptions.add(
        this.transferService
          .bankOrInstantTransfer(transfer)
          .pipe(
            map((destinationAccountUserId: string) => {
              this.form.reset();
              return {
                ...transfer,
                destinationAccountUserId,
              };
            }),
            switchMap(transfera => this.transferService.postTransactionToDb(transfera)),
            catchError(error => {
              alert(error);
              return error;
            }),
          ).subscribe(),
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
  get destinationAccountNumber(): AbstractControl {
    return this.form.get('destinationAccountNumber');
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
  get transferType(): AbstractControl {
    return this.form.get('transferType');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
