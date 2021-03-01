import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Itransaction } from '../../interfaces/bank-transactions.interface';
import { sample } from './models/sample.model';
import FastAverageColor from 'fast-average-color';

@Component({
  selector: 'app-shared-bank-transaction-details',
  templateUrl: './bank-transaction-details.component.html',
  styleUrls: ['./bank-transaction-details.component.scss'],
})
export class BankTransactionDetailsComponent implements OnInit {
  @Input() transaction: Itransaction = sample;
  @Output() closePopup = new EventEmitter();
  @Output() sendReceipt = new EventEmitter();
  background = '#fff';
  opacity = '70%';
  error: string;
  showTag = true;
  tagColor = 'orange';
  accNum = this.transaction.fromAccountNumber.toString();

  ngOnInit() {
    if (this.transaction) {
      const fac = new FastAverageColor();
      fac
        .getColorAsync(this.transaction.iconPath)
        .then((data) => {
          this.background = data.hex;
          this.opacity = '100%';
        })
        .catch((e) => {
          this.error = e;
          this.background = 'rgb(221, 32, 49)';
        });
    }
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
