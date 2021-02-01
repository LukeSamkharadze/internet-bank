import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Transaction {
  title: string,
  status: string,
  cardNumber: number,
  amount: string,
  date: string,
  icon: string
}

@Component({
  selector: 'app-bank-transaction-details',
  templateUrl: './bank-transaction-details.component.html',
  styleUrls: ['./bank-transaction-details.component.scss']
})
export class BankTransactionDetailsComponent implements OnInit {
  // @Input() transaction: Transaction;
  transaction = {
    title: 'Title',
    status: 'Status',
    cardNumber: 9999,
    amount: '+ $999.99',
    date: '2/2/2021 1:17 AM',
    icon: "https://miro.medium.com/max/10368/1*o8tTGo3vsocTKnCUyz0wHA.jpeg"
  }
  @Output() closePopup = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.closePopup.emit();
    return true;
  }

}
