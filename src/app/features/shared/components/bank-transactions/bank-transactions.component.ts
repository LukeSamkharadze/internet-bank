import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TransactionsService } from './services/transactions.service';
import { TransactionsList } from './models/bank-transaction.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-features-shared-bank-transactions',
  templateUrl: './bank-transactions.component.html',
  styleUrls: ['./bank-transactions.component.scss'],
})
export class BankTransactionsComponent implements OnInit, OnChanges {
  @Input() input;
  hasInput = true;
  show = true;
  // transactionsList: Array<TransactionsList> = [];
  transactionsList$: Observable<TransactionsList[]>;
  searchText;
  popDetails = false;
  transactionObject$: Observable<TransactionsList>;

  chosenDate = null;
  chosenType = null;

  constructor(private getTransactionService: TransactionsService) {}

  fetchTransactions() {
    this.transactionsList$ = this.getTransactionService
      .getTransactions(
        this.chosenDate,
        this.chosenType,
        this.input || undefined
      )
      .pipe(
        map((data) =>
          data.map((element) => ({
            ...element,
            date: new Date(element.date),
          }))
        )
      );
  }

  ngOnInit() {
    this.fetchTransactions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('input' in changes) {
      if (this.input || this.input === '') {
        this.hasInput = false;
        this.show = false;
        this.fetchTransactions();
      } else {
        this.hasInput = true;
        this.show = true;
      }
    }
  }

  pop(id: number) {
    this.transactionObject$ = this.transactionsList$.pipe(
      map((data) => data.find((x) => x.id === id))
    );
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
