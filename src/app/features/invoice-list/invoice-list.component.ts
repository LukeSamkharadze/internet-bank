import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Invoice } from '../shared/interfaces/invoice-models.interface/invoice.model';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  tabNames = ['All', 'Paid', 'Pending', 'Cancelled'];
  url = 'http://localhost:3000/invoice';
  public allInvoices: Array<Invoice>;
  public paidInvoices: Array<Invoice>;
  public pendingInvoices: Array<Invoice>;
  public cancelledInvoices: Array<Invoice>;
  public popDetails: boolean;
  public item;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.url).subscribe((data: Array<Invoice>) => {
      console.log(data);
      this.allInvoices = data;
      this.paidInvoices = this.allInvoices.filter(this.getPaidInvoices);
      this.pendingInvoices = this.allInvoices.filter(this.getPendingInvoices);
      this.cancelledInvoices = this.allInvoices.filter(
        this.getCancelledInvoices
      );
    });
  }

  getPaidInvoices(value: Invoice): boolean {
    return value.status === 'Paid';
  }

  getPendingInvoices(value: Invoice): boolean {
    return value.status === 'Pending';
  }
  getCancelledInvoices(value: Invoice): boolean {
    return value.status === 'Cancelled';
  }
  popUp(item: any) {
    this.popDetails = true;
    this.item = item;

    console.log(item);
  }
  closePopup() {
    this.popDetails = false;
  }
}
