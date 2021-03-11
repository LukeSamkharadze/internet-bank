import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ILimits } from './payment-interfaces';
import { PaymentLimitsService } from '../shared/services/payment-limits.service';
import { TransactionService } from '../shared/services/transaction.service';
import { Transfer } from '../shared/interfaces/transfers/transfer.interface';
import { SocketIoService } from '../shared/services/socket-io.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotificationsManagerService } from '../../shared/services/notifications-manager.service';
import { NotificationItem } from '../../shared/entity/notificationItem';

@Component({
  selector: 'app-payment-limits',
  templateUrl: './payment-limits.component.html',
  styleUrls: ['./payment-limits.component.scss'],
})
export class PaymentLimitsComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject();
  id = parseInt(this.auth.userId, 10);

  everyLimit: ILimits = {
    bankLimit: 0,
    onlineLimit: 0,
    cashLimit: 0,
  };

  onlineSpending = 0;
  bankSpending = 0;

  formGroup: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private paymentLimitService: PaymentLimitsService,
    private transactionService: TransactionService,
    private socketIo: SocketIoService,
    private alertService: NotificationsManagerService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.getHTTP();
    this.getOnlineSpending();
    this.getBankSpending();
    this.socketIo
      .listen('expanses')
      .pipe(
        takeUntil(this.unsubscriber),
        tap(() => {
          this.getOnlineSpending();
          this.getBankSpending();
        })
      )
      .subscribe();
  }

  getHTTP() {
    this.paymentLimitService.getById(this.id).subscribe((val) => {
      this.everyLimit = val;

      this.withdrawLimit.patchValue(val.cashLimit);
      this.bankLimit.patchValue(val.bankLimit);
      this.onlineLimit.patchValue(val.onlineLimit);
    });
  }
  getOnlineSpending() {
    this.transactionService
      .getOnlineSpendings(this.id.toString())
      .subscribe((data: Transfer[]) => {
        let sum = 0;
        data.forEach((payment: Transfer) => {
          sum += payment.amount;
        });
        this.onlineSpending = sum;
      });
  }
  getBankSpending() {
    this.transactionService
      .getBankSpendings(this.id.toString())
      .subscribe((data) => {
        let sum = 0;
        data.forEach((payment) => {
          sum += payment.amount;
        });
        this.bankSpending = sum;
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
      this.onlineLimit.value < this.onlineSpending ||
      this.withdrawLimit.value < 1 ||
      this.bankLimit.value < this.bankSpending
    ) {
      this.alertService.add(
        new NotificationItem('Limiti naklebi ver iqneba', 'failure', 2000),
        false
      );
      return;
    }

    const newLimits: ILimits = {
      bankLimit: this.bankLimit.value,
      onlineLimit: this.onlineLimit.value,
      cashLimit: this.withdrawLimit.value,
    };
    this.paymentLimitService.updateUser(this.id, newLimits).subscribe();
    this.everyLimit.onlineLimit = this.onlineLimit.value;
    this.everyLimit.bankLimit = this.bankLimit.value;
    this.everyLimit.cashLimit = this.withdrawLimit.value;
  }

  ngOnDestroy() {
    this.unsubscriber.next();
  }
}
