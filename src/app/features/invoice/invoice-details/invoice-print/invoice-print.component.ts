import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private route: Router) {}

  ngOnInit(): void {
    if (history.state.data) {
      this.invoice = history.state.data;
      this.color = history.state.color;
      this.prices = history.state.prices;
      setTimeout(() => {
        window.print();
        this.route.navigate(['/invoices']);
      }, 1500);
    } else {
      this.route.navigate(['/invoices']);
    }
  }

  getAddress(): string[] {
    return this.invoice.address.split(',');
  }
}
