import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { animations } from '../shared/animations';
import { summaryAnimation } from '../shared/animations';
import { TransferService } from '../../../services/transfer.service';
import { ElectronicTransfer } from '../../../models/electronicTransfer.entity';

@Component({
  selector: 'app-electronic-payment-form',
  templateUrl: './electronic-payment-form.component.html',
  styleUrls: ['./electronic-payment-form.component.scss'],
  animations: [
    animations.errorTrigger,
    animations.formTrigger,
    summaryAnimation.summaryTrigger,
  ],
})
export class ElectronicPaymentFormComponent implements OnInit {
  title = 'Online payment';
  form: FormGroup;
  constructor(private transferService: TransferService) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      account: new FormControl('', Validators.required),
      paymentSystem: new FormControl('', Validators.required),
      destinationEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      amount: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const transfer: ElectronicTransfer = {
        date: new Date(),
        paymentType: 'electronic',
        fromAccount: this.account.value,
        paymentSystem: this.paymentSystem.value,
        destinationEmail: this.destinationEmail.value,
        amount: this.amount.value,
        currency: this.currency.value,
      };
      this.transferService.addTransfer(transfer).subscribe((_) => {
        alert('successful payment');
      });
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onReset() {
    this.form.reset();
  }

  // getters
  // @ts-ignore
  get account(): AbstractControl {
    return this.form.get('account');
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
}
