import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from './models/transaction.model';

@Component({
  selector: 'app-bank-transaction-details',
  templateUrl: './bank-transaction-details.component.html',
  styleUrls: ['./bank-transaction-details.component.scss'],
})
export class BankTransactionDetailsComponent implements OnInit {
  @Input() transaction: Transaction;
  @Output() closePopup = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.closePopup.emit();
    return true;
  }
}
