import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { animations } from '../shared/animations';
import { TransferService } from '../../../services/transfer.service';
import { BankTransfer } from '../../../models/bankTransfer.entity';

@Component({
  selector: 'app-bank-transfer-form',
  templateUrl: './bank-transfer-form.component.html',
  styleUrls: ['./bank-transfer-form.component.scss'],
  animations: [animations.errorTrigger, animations.formTrigger],
})
export class BankTransferFormComponent implements OnInit {
  title = 'Bank transfer';
  form: FormGroup;
  constructor(private transferService: TransferService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      account: new FormControl('', Validators.required),
      transferTo: new FormControl('', Validators.required),
      beneficiary: new FormControl('', Validators.required),
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
        fromAccount: this.account.value,
        destinationAccountNumber: this.transferTo.value,
        beneficiary: this.beneficiary.value,
        amount: this.amount.value,
        currency: this.currency.value,
        transferType: this.transferType.value,
      };
      this.transferService.addTransfer(transfer).subscribe((_) => {
        alert('successful payment');
      });
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  // getters
  // @ts-ignore
  get account(): AbstractControl {
    return this.form.get('account');
  }
  // @ts-ignore
  get transferTo(): AbstractControl {
    return this.form.get('transferTo');
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
}
