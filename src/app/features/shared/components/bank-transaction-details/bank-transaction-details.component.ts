import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from './models/transaction.model';
import FastAverageColor from 'fast-average-color'; // npm install fast-average-color

@Component({
  selector: 'app-shared-bank-transaction-details',
  templateUrl: './bank-transaction-details.component.html',
  styleUrls: ['./bank-transaction-details.component.scss'],
})
export class BankTransactionDetailsComponent {
  @Input() transaction: Transaction = {
    title: 'Default Title',
    status: 'Paid',
    tagColor: 'green',
    cardNumber: 1234,
    amount: '- $0',
    date: '2021/02/02 11:42 PM',
    icon: 'https://miro.medium.com/max/10368/1*o8tTGo3vsocTKnCUyz0wHA.jpeg',
  };
  @Output() closePopup = new EventEmitter();
  @Output() sendReceipt = new EventEmitter();
  background = '#fff';
  opacity = '70%';
  error: string;
  showTag = true;

  constructor() {
    if (this.transaction) {
      const fac = new FastAverageColor();
      fac
        .getColorAsync(this.transaction.icon)
        .then((data) => {
          this.background = data.hex;
          this.opacity = '100%';
        })
        .catch((e) => {
          this.error = e;
          this.background = 'rgb(221, 32, 49)';
        });
    }
  }

  closeModal() {
    this.closePopup.emit();
    return true;
  }

  closeTag() {
    this.showTag = false;
  }

  receipt(object: Transaction) {
    this.sendReceipt.emit(object);
  }
}
