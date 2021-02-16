import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ILimits } from './payment-interfaces';
import { PaymentLimitsService } from './payment-limits.service';

@Component({
  selector: 'app-payment-limits',
  templateUrl: './payment-limits.component.html',
  styleUrls: ['./payment-limits.component.scss'],
})
export class PaymentLimitsComponent implements OnInit {
  // ro gaketdeba id is nacvlad localID
  // localID = parseInt(localStorage.getItem("id"))

  id = 1;

  // Cash withdrawals

  @Input() withdrawCurrency = 'USD';

  withdrawSpending = 0;

  startWithdrawLimit = 0;

  // Bank Transactions

  @Input() transactionCurrency = 'USD';

  transactionSpending = 0;

  startTransactionLimit = 0;

  // Online payments

  @Input() onlineCurrency = 'USD';

  onlineSpending = 0;

  startOnlineLimit = 0;

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private http: PaymentLimitsService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.getHTTP();
  }

  getHTTP() {
    this.http.getData(this.id).subscribe((val) => {
      console.log(val);
      this.onlineSpending = val.onlineSpending;
      this.withdrawSpending = val.cashSpending;
      this.transactionSpending = val.bankSpending;
      this.startOnlineLimit = val.onlineLimit;
      this.startTransactionLimit = val.bankLimit;
      this.startWithdrawLimit = val.cashLimit;

      this.withdrawLimit.patchValue(val.cashLimit);
      this.bankLimit.patchValue(val.bankLimit);
      this.onlineLimit.patchValue(val.onlineLimit);
    });
  }

  createFormGroup() {
    this.formGroup = this.fb.group({
      limitWithdraw: [''],
      limitBank: [''],
      limitOnline: [''],
    });
  }

  get bankLimit() {
    return this.formGroup.get('limitBank');
  }

  get withdrawLimit() {
    return this.formGroup.get('limitWithdraw');
  }
  get onlineLimit() {
    return this.formGroup.get('limitOnline');
  }

  onChange(val) {
    this.formGroup.get(val.name).patchValue(val.data);
  }
  onCancel(cancel) {
    this.formGroup.reset({
      limitWithdraw: this.startWithdrawLimit,
      limitBank: this.startTransactionLimit,
      limitOnline: this.startOnlineLimit,
    });
  }
  onUpdate(update) {
    if (
      this.onlineLimit.value < this.onlineSpending ||
      this.withdrawLimit.value < this.withdrawSpending ||
      this.bankLimit.value < this.transactionSpending
    ) {
      alert('Limiti naklebi ver iqneba');
      return;
    }

    const newLimits: ILimits = {
      bankLimit: this.bankLimit.value,
      onlineLimit: this.onlineLimit.value,
      cashLimit: this.withdrawLimit.value,
      bankSpending: this.transactionSpending,
      cashSpending: this.withdrawSpending,
      onlineSpending: this.onlineSpending,
    };
    this.http.updateUser(this.id, newLimits).subscribe();
    this.startOnlineLimit = this.onlineLimit.value;
    this.startTransactionLimit = this.bankLimit.value;
    this.startWithdrawLimit = this.withdrawLimit.value;
  }
}
