import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/features/shared/interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.scss'],
})
export class InvoicePrintComponent implements OnInit {
  invoice: Invoice;
  color: string;
  prices: { subtotal: number; tax: number; total: number };

  ngOnInit(): void {
    if (history.state.data) {
      this.invoice = history.state.data;
      this.color = history.state.color;
      this.prices = history.state.prices;
      setTimeout(window.print, 1500);
    }
  }

  getAddress(): string[] {
    return this.invoice.address.split(',');
  }
}
