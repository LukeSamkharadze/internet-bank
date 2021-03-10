import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
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
  @Input() transaction: Itransaction = sample;
  @Output() closePopup = new EventEmitter();
  @Output() sendReceipt = new EventEmitter();
  background = new BehaviorSubject('#fff');
  error: string;
  showTag = true;
  tagColor = 'orange';
  accNum: string;
  isNegative = false;
  amount = '$';

  ngOnChanges() {
    this.accNum = this.transaction.fromAccountNumber.toString().substring(18);
    const fac = new FastAverageColor();
    fac
      .getColorAsync(this.transaction.iconPath)
      .then((data) => {
        this.background.next(data.hex);
      })
      .catch((e) => {
        this.error = e;
        this.background.next('#00adee');
      });
    this.transaction.status =
      this.transaction.status.charAt(0).toUpperCase() +
      this.transaction.status.substring(1);
    switch (this.transaction.status) {
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
    // amount sometimes contains '-' so it will show as $-7 without this
    if (this.transaction.amount[0] === '-') {
      this.isNegative = true;
      this.amount = '-' + '$' + this.transaction.amount.substring(1);
    } else {
      this.amount += this.transaction.amount;
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
