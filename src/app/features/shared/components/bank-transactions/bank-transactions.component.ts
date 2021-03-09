import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TransactionsService } from './services/transactions.service';
import { TransactionsList } from './models/bank-transaction.model';

@Component({
  selector: 'app-features-shared-bank-transactions',
  templateUrl: './bank-transactions.component.html',
  styleUrls: ['./bank-transactions.component.scss'],
})
export class BankTransactionsComponent implements OnInit {
  @Input() input;
  hasInput = true;
  show = true;
  transactionsList: Array<TransactionsList> = [];
  searchText;
  popDetails = false;
  transactionObject = {};
  chosenDate = null;
  chosenType = null;

  constructor(private getTransactionService: TransactionsService) {}

  fetchTransactions() {
    this.getTransactionService
      .getTransactions(this.chosenDate, this.chosenType, this.input)
      .subscribe((data) => {
        this.transactionsList = [];
        data.forEach((element) => {
          this.transactionsList.push({
            ...element,
            date: new Date(element.date),
          });
        });
      });
  }

  ngOnInit() {
    this.fetchTransactions();
    if (this.input) {
      this.hasInput = false;
      this.show = false;
    }
  }

  pop(id: number) {
    this.transactionObject = this.transactionsList.find((x) => x.id === id);
    this.popDetails = true;
  }

  closePopup() {
    this.popDetails = false;
  }

  sendReceipt() {}

  myFilter(d: Date): number {
    const day = d.getDay() + 1;
    // Prevent Saturday and Sunday from being selected.
    return day;
  }
  dateChangeEvent($event) {
    const month = $event.value.getMonth() + 1;
    const date = $event.value.getDate();
    this.chosenDate =
      $event.value.getYear() +
      1900 +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      (date < 10 ? '0' + date : date);
    this.fetchTransactions();
  }

  typeChangeEvent($event) {
    this.chosenType = $event.toLowerCase();
    this.fetchTransactions();
  }
}
