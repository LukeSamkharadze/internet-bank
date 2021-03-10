import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TransactionsService } from './services/transactions.service';
import { TransactionsList } from './models/bank-transaction.model';
import { SocketIoService } from '../../services/socket-io.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-features-shared-bank-transactions',
  templateUrl: './bank-transactions.component.html',
  styleUrls: ['./bank-transactions.component.scss'],
})
export class BankTransactionsComponent implements OnInit, OnChanges, OnDestroy {
  unsubscriber = new Subject();
  @Input() input;
  hasInput = true;
  show = true;
  transactionsList: Array<TransactionsList> = [];
  searchText;
  popDetails = false;
  transactionObject = new BehaviorSubject({});

  chosenDate = null;
  chosenType = null;

  constructor(
    private getTransactionService: TransactionsService,
    private socketIo: SocketIoService
  ) {}

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
    this.socketIo
      .listen('transaction')
      .pipe(
        takeUntil(this.unsubscriber),
        tap(() => this.fetchTransactions())
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('input' in changes) {
      if (this.input) {
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
    this.transactionObject.next(this.transactionsList.find((x) => x.id === id));
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

  ngOnDestroy() {
    this.unsubscriber.next();
  }
}
