import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-limits',
  templateUrl: './payment-limits.component.html',
  styleUrls: ['./payment-limits.component.scss'],
})
export class PaymentLimitsComponent implements OnInit {
  // Cash withdrawals

  @Input() withdrawCurrency = 'USD';

  @Input() withdrawLimit = 9000;

  @Input() withdrawSpending = 8000;

  // Bank Transactions

  @Input() transactionCurrency = 'USD';

  @Input() transactionLimit = 2000;

  @Input() transactionSpending = 1500;

  // Online payments

  @Input() onlineCurrency = 'USD';

  @Input() onlineLimit = 5000;

  @Input() onlineSpending = 2500;

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      limitWithdraw: this.withdrawLimit,
      limitBank: this.transactionLimit,
      limitOnline: this.onlineLimit,
    });
  }

  onChange(val) {
    this.formGroup.get(val.name).patchValue(val.data);
  }
  onCancle(cancle) {
    console.log(cancle);
    console.log('CANCLE');
  }
  onUpdate(update) {
    console.log(update);
    console.log('UPDATE');
  }
}
