import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../shared/interfaces/invoice.interface';
import { InvoiceService } from '../../shared/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  tabNames = ['All', 'Paid', 'Pending', 'Cancelled'];
  public invoices: Array<Invoice>;
  public allInvoices = [];
  public paidInvoices: Array<Invoice>;
  public pendingInvoices: Array<Invoice>;
  public cancelledInvoices: Array<Invoice>;
  public popDetails: boolean;
  public item;
  public data;

  constructor(
    private http: HttpClient,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.invoiceService.getAll().subscribe((data: Array<Invoice>) => {
      this.invoices = data;
      this.allInvoices = data;
      this.loadValues();
    });
  }
  popUp(item: any) {
    this.popDetails = true;
    this.item = item;
  }
  closePopup() {
    this.popDetails = false;
  }
  loadValues() {
    this.paidInvoices = this.allInvoices.filter(
      (item) => item.status === 'Paid'
    );

    this.pendingInvoices = this.allInvoices.filter(
      (item) => item.status === 'Pending'
    );
    this.cancelledInvoices = this.allInvoices.filter(
      (item) => item.status === 'Cancelled'
    );
  }
  dataChange() {
    this.allInvoices = this.invoices.filter(
      (item) => item.dueDate.slice(0, 7) === this.data
    );
    this.loadValues();
  }
}
