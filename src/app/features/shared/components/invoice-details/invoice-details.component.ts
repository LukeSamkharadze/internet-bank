import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Invoice } from './models/invoice.model';

@Component({
  selector: 'app-shared-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent {
  @Input() invoice: Invoice = {
    number: 'IO-BN-124',
    title: 'Vodafone LLC',
    address: {
      address1: '44-46 Morningside Road',
      address2: 'EH10 4BF',
      address3: 'Department 98',
      city: 'Edinburgh',
      country: 'Scotland',
      mail: 'marketing@vdfn.com',
    },
    date: '6 Aug 2018, 2:15 AM',
    due: '16 Aug 2018',
    tagColor: 'green',
    status: 'Paid',
    currency: '$',
    items: [
      {
        desc: 'Marketing materials',
        rate: 50,
        qty: 150,
      },
      {
        desc: 'Website design',
        rate: 350,
        qty: 1,
      },
      {
        desc: 'Mobile app',
        rate: 550,
        qty: 2,
      },
      {
        desc: 'Printing equipment',
        rate: 150,
        qty: 10,
      },
    ],
  };

  @Output() closePopup = new EventEmitter();

  constructor() {}

  print() {
    window.print();
  }

  getSubTotal() {
    let total = 0;
    for (const inv of this.invoice.items) {
      total += inv.rate * inv.qty;
    }
    return total;
  }

  getTax() {
    return this.getSubTotal() / 10;
  }

  close() {
    this.closePopup.emit();
  }
}
