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
export class BankTransactionsComponent implements OnInit, OnChanges {
  @Input() input;
  hasInput = true;
  show = true;
  transactionsList: Array<TransactionsList> = [];
  searchText;
  popDetails = false;
  transactionObject = {};
  monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  chosenDate = null;
  chosenType = null;

  // if feature tag has an '[input]' property, make hasInput=false. Thus, searchtab will not be displayed.
  ngOnChanges(changes: SimpleChanges) {
    /* tslint:disable:no-string-literal */
    if (changes.hasOwnProperty('input')) {
      if (changes['input'].isFirstChange()) {
        // AKA initialization by angular
        this.hasInput = false;
        this.show = false;
        return this.hasInput;
      }
    }
    /* tslint:enable:no-string-literal */
  }

  constructor(private getTransactionService: TransactionsService) {}

  fetchTransactions() {
    this.getTransactionService
      .getTransactions(this.chosenDate, this.chosenType)
      .subscribe((data) => {
        this.transactionsList = [];
        data.forEach((element) => {
          this.transactionsList.push({
            id: element.id,
            title: element.title,
            icon: element.iconPath,
            type: element.type,
            beneficiary: element.beneficiary,
            amount: element.amount,
            date: element.date,
            status: element.status,
            cardNumber: String(element.fromAccountNumber).slice(-4),
            fromAccountUserId: element.fromAccountUserId,
            toUserId: element.toUserId,
            toAccountNumber: element.toAccountNumber,
            bankTransferType: element.bankTransferType,
            currency: element.currency,
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

  myFilter(d: Date): boolean {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  dateChangeEvent($event) {
    this.chosenDate =
      $event.value.getDate() +
      ' ' +
      this.monthNames[$event.value.getMonth()] +
      ' ' +
      ($event.value.getYear() + 1900);
    this.fetchTransactions();
  }

  typeChangeEvent($event) {
    this.chosenType = $event;
    this.fetchTransactions();
  }
}
