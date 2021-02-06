import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { animations } from '../shared/animations';

@Component({
  selector: 'app-electronic-payment-form',
  templateUrl: './electronic-payment-form.component.html',
  styleUrls: ['./electronic-payment-form.component.scss'],
  animations: [
    animations.errorTrigger,
    animations.summaryTrigger,
    animations.formTrigger,
  ],
})
export class ElectronicPaymentFormComponent implements OnInit {
  title = 'Online payment';
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      account: new FormControl('', Validators.required),
      paymentSystem: new FormControl('', Validators.required),
      paypalAccount: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      amount: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      alert('success');
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
  get paypalAccount(): AbstractControl {
    return this.form.get('paypalAccount');
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
