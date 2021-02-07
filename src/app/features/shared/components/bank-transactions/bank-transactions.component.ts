import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GetTransactionsService } from './services/get-transactions.service';
import { BankTransactionDetailsComponent } from './../bank-transaction-details/bank-transaction-details.component';
@Component({
  selector: 'app-bank-transactions',
  templateUrl: './bank-transactions.component.html',
  styleUrls: ['./bank-transactions.component.scss'],
})
export class BankTransactionsComponent implements OnInit, OnChanges {
  @Input() input;

  hasInput;
  transactionsList: Array<{
    id: number;
    title: string;
    icon: string;
    type: string;
    amount: string;
    date: string;
    status: string;
    tagColor: string;
    cardNUmber: number;
  }> = [];

  show = true;
  searchText;
  popDetails = false;
  transactionObject = {};

  ngOnChanges(changes: SimpleChanges) {
    /* tslint:disable:no-string-literal */
    if (changes.hasOwnProperty('input')) {
      if (changes['input'].isFirstChange()) {
        // AKA initialization by angular
        this.hasInput = true;
        return this.hasInput;
      }
    }
    /* tslint:enable:no-string-literal */
  }

  constructor(private getTransactionService: GetTransactionsService) {}

  fetchTransactions() {
    this.getTransactionService.getTransactions().subscribe((data) => {
      this.transactionsList = [];
      data.forEach((element) => {
        this.transactionsList.push({
          id: element.id,
          title: element.title,
          icon: element.img,
          type: element.type,
          amount: element.amount,
          date: element.date,
          status: element.status,
          tagColor: element.tagColor,
          cardNUmber: element.cardNUmber,
        });
      });
    });
  }

  ngOnInit() {
    this.fetchTransactions();
  }

  pop(id: number) {
    this.transactionObject = this.transactionsList.find((x) => x.id === id);
    this.popDetails = true;
  }

  closePopup() {
    this.popDetails = false;
  }

  sendReceipt() {}
}
