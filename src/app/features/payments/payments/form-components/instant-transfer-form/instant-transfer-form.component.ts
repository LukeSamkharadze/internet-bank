import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formAnimations } from '../../../../shared/animations';
import { InstantTransfer } from '../../../../shared/interfaces/instantTransfer.entity';
import { TransferService } from '../../../services/transfer.service';
import { Subscription } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-instant-transfer-form',
  templateUrl: './instant-transfer-form.component.html',
  styleUrls: ['./instant-transfer-form.component.scss'],
  animations: [formAnimations.errorTrigger, formAnimations.formTrigger],
})
export class InstantTransferFormComponent implements OnInit, OnDestroy {
  title = 'Instant transfer';
  form: FormGroup;
  currentUsersCards = this.transferService.currentUsersCards$;
  private subscriptions = new Subscription();

  constructor(private transferService: TransferService) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      fromAccount: new FormControl('', Validators.required),
      destinationAccountNumber: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
      transferType: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const transfer: InstantTransfer = {
        date: new Date(),
        paymentType: 'instant',
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
            switchMap((transfera) =>
              this.transferService.postTransactionToDb(transfera)
            ),
            catchError((error) => {
              console.log(error);
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
  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  // @ts-ignore
  get transferType(): AbstractControl {
    return this.form.get('transferType');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
