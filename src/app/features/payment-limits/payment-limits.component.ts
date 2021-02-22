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
import { AuthService } from '../shared/services/auth.service';
import { ILimits } from './payment-interfaces';
import { PaymentLimitsService } from './payment-limits.service';

@Component({
  selector: 'app-payment-limits',
  templateUrl: './payment-limits.component.html',
  styleUrls: ['./payment-limits.component.scss'],
})
export class PaymentLimitsComponent implements OnInit {
  id = parseInt(this.auth.userId, 10);

  everyLimit: ILimits = {
    bankLimit: 0,
    onlineLimit: 0,
    cashLimit: 0,
    bankSpending: 0,
    cashSpending: 0,
    onlineSpending: 0,
  };

  @Input() withdrawCurrency = 'USD';

  @Input() transactionCurrency = 'USD';

  @Input() onlineCurrency = 'USD';

  formGroup: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private http: PaymentLimitsService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.getHTTP();
  }

  getHTTP() {
    this.http.getData(this.id).subscribe((val) => {
      this.everyLimit = val;

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
      limitWithdraw: this.everyLimit.cashLimit,
      limitBank: this.everyLimit.bankLimit,
      limitOnline: this.everyLimit.onlineLimit,
    });
  }
  onUpdate(update) {
    if (
      this.onlineLimit.value < this.everyLimit.onlineSpending ||
      this.withdrawLimit.value < this.everyLimit.cashSpending ||
      this.bankLimit.value < this.everyLimit.bankSpending
    ) {
      alert('Limiti naklebi ver iqneba');
      return;
    }

    const newLimits: ILimits = {
      bankLimit: this.bankLimit.value,
      onlineLimit: this.onlineLimit.value,
      cashLimit: this.withdrawLimit.value,
      bankSpending: this.everyLimit.bankSpending,
      cashSpending: this.everyLimit.cashSpending,
      onlineSpending: this.everyLimit.onlineSpending,
    };
    this.http.updateUser(this.id, newLimits).subscribe();
    this.everyLimit.onlineLimit = this.onlineLimit.value;
    this.everyLimit.bankLimit = this.bankLimit.value;
    this.everyLimit.cashLimit = this.withdrawLimit.value;
  }
}
