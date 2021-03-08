import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { Itransaction } from '../../interfaces/bank-transactions.interface';
import { sample } from './models/sample.model';
import FastAverageColor from 'fast-average-color';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shared-bank-transaction-details',
  templateUrl: './bank-transaction-details.component.html',
  styleUrls: ['./bank-transaction-details.component.scss'],
})
export class BankTransactionDetailsComponent implements OnChanges {
  object: Itransaction = sample;
  @Input() transaction: Itransaction;
  @Output() closePopup = new EventEmitter();
  @Output() sendReceipt = new EventEmitter();
  background = new BehaviorSubject('#fff');
  opacity = new BehaviorSubject('70%');
  error: string;
  showTag = true;
  tagColor = 'orange';
  accNum: string;

  ngOnChanges() {
    if (this.object !== this.transaction) {
      this.object = this.transaction;
      this.accNum = this.transaction.fromAccountNumber.toString().substring(12);
      const fac = new FastAverageColor();
      fac
        .getColorAsync(this.object.iconPath)
        .then((data) => {
          this.background.next(data.hex);
          this.opacity.next('100%');
        })
        .catch((e) => {
          this.error = e;
          this.background.next('rgb(221, 32, 49)');
        });
      this.object.status =
        this.object.status.charAt(0).toUpperCase() +
        this.object.status.substring(1);
      switch (this.object.status) {
        case 'Pending':
          this.tagColor = 'orange';
          break;
        case 'Paid':
          this.tagColor = 'green';
          break;
        case 'Cancelled':
          this.tagColor = 'pink';
          break;
      }
    }
  }

  closeModal() {
    this.closePopup.emit();
    return true;
  }

  closeTag() {
    this.showTag = false;
  }

  receipt(object: Itransaction) {
    this.sendReceipt.emit(object);
  }
}
