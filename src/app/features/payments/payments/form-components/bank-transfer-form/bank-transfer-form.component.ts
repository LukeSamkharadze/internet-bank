import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-bank-transfer-form',
  templateUrl: './bank-transfer-form.component.html',
  styleUrls: ['./bank-transfer-form.component.scss'],
})
export class BankTransferFormComponent implements OnInit {
  title = 'Bank transfer';
  form: FormGroup;

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
      alert('forma daasubmite yvero');
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
