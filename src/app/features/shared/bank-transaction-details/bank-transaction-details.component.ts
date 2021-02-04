import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from './models/transaction.model';
import FastAverageColor from 'fast-average-color'; // npm install fast-average-color

@Component({
  selector: 'app-bank-transaction-details',
  templateUrl: './bank-transaction-details.component.html',
  styleUrls: ['./bank-transaction-details.component.scss'],
})
export class BankTransactionDetailsComponent {
  @Input() transaction: Transaction;
  @Output() closePopup = new EventEmitter();
  background = 'rgb(221, 32, 49)';
  opacity = '70%';
  error: string;

  constructor() {
    if (this.transaction) {
      const fac = new FastAverageColor();
      fac
        .getColorAsync(this.transaction.icon)
        .then((data) => {
          this.background = data.hex;
          this.opacity = '100%';
        })
        .catch((e) => (this.error = e));
    }
  }

  closeModal() {
    this.closePopup.emit();
    return true;
  }
}
