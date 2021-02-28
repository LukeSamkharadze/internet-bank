import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Invoice } from '../../interfaces/invoice.interface';
import { sample } from './models/sample.model';

@Component({
  selector: 'app-shared-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnChanges {
  showTag = true;
  @Input() invoice: Invoice = sample;
  @Output() closePopup = new EventEmitter();
  prices = {
    subtotal: 0,
    tax: 0,
    total: 0,
  };

  ngOnChanges() {
    this.prices.subtotal = this.invoice.totalAmount;
    this.prices.tax = this.invoice.totalAmount / 10;
    this.prices.total = this.prices.tax + this.prices.subtotal;
  }

  print(): void {
    window.print();
  }

  getAddress(): string[] {
    return this.invoice.address.split(',');
  }

  getColor(): string {
    switch (this.invoice.status) {
      case 'Paid':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Cancelled':
        return 'pink';
    }
  }

  getPrice(): { subtotal: number; tax: number; total: number } {
    return {
      subtotal: this.invoice.totalAmount,
      tax: this.invoice.totalAmount / 10,
      total: this.invoice.totalAmount + this.invoice.totalAmount / 10,
    };
  }

  close(): void {
    this.closePopup.emit();
  }

  closeTag(): void {
    this.showTag = false;
  }
}
