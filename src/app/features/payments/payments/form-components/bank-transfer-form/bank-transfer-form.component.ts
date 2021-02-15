import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { animations } from '../shared/animations';
import { TransferService } from '../../../services/transfer.service';
import { BankTransfer } from '../../../models/bankTransfer.entity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bank-transfer-form',
  templateUrl: './bank-transfer-form.component.html',
  styleUrls: ['./bank-transfer-form.component.scss'],
  animations: [animations.errorTrigger, animations.formTrigger],
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
      amount: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      transferType: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const transfer: BankTransfer = {
        date: new Date(),
        paymentType: 'bank',
        ...this.form.getRawValue(),
      };
      this.subscriptions.add(
        this.transferService
          .bankOrInstantTransfer(transfer)
          .subscribe((data: { status: string; reason?: string }) => {
            if (data.status === 'success') {
              alert('success');
              this.form.reset();
              this.subscriptions.add(
                this.transferService.postTransactionToDb(transfer).subscribe()
              );
              this.transferService.reloadCards();
            } else {
              alert(data.reason);
            }
          })
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
