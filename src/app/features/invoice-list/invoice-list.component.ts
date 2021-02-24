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
  public invoices: Array<Invoice>;
  public allInvoices = [];
  public paidInvoices: Array<Invoice>;
  public pendingInvoices: Array<Invoice>;
  public cancelledInvoices: Array<Invoice>;
  public popDetails: boolean;
  public item;
  public data;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.data = '2018-08';
    this.http.get(this.url).subscribe((data: Array<Invoice>) => {
      this.invoices = data;
      this.dataChange();
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
  calculateAmount(allInvoices: object) {
    this.allInvoices.forEach((element) => {
      element.amount = 0;
      for (let item of element.items) {
        element.amount += parseFloat(item.rate) * parseFloat(item.qty);
      }

      element.amount = element.amount.toString();
      console.log(element);
    });
  }
  dataChange() {
    this.allInvoices = [];
    this.allInvoices = this.invoices.filter(
      (item) => item.due.slice(0, 7) === this.data
    );
    this.calculateAmount(this.allInvoices);
    this.loadValues();
  }
}
