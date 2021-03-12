import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Invoice } from '../../shared/interfaces/invoice.interface';
import { InvoiceService } from '../../shared/services/invoice.service';
import { SocketIoService } from '../../shared/services/socket-io.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject();
  tabNames = ['All', 'Paid', 'Pending', 'Cancelled'];
  public invoices: Array<Invoice>;
  public allInvoices = [];
  public paidInvoices: Array<Invoice>;
  public pendingInvoices: Array<Invoice>;
  public cancelledInvoices: Array<Invoice>;
  public popDetails: boolean;
  public item;
  public data;
  public noInvoices = false;
  public noPaid = false;
  public noPending = false;
  public noCancelled = false;

  constructor(
    private http: HttpClient,
    private invoiceService: InvoiceService,
    private socketIo: SocketIoService
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
    this.socketIo
      .listen('invoice')
      .pipe(
        takeUntil(this.unsubscriber),
        tap(() => this.loadInvoices())
      )
      .subscribe();
  }

  loadInvoices() {
    this.invoiceService.getAll().subscribe((data: Array<Invoice>) => {
      this.invoices = data;
      this.allInvoices = data;
      this.loadValues();
      this.noInvoices = data.length === 0 ? true : false;
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
    this.noPaid = this.paidInvoices.length === 0 ? true : false;

    this.pendingInvoices = this.allInvoices.filter(
      (item) => item.status === 'Pending'
    );
    this.noPending = this.pendingInvoices.length === 0 ? true : false;

    this.cancelledInvoices = this.allInvoices.filter(
      (item) => item.status === 'Cancelled'
    );
    this.noCancelled = this.cancelledInvoices.length === 0 ? true : false;
  }
  dataChange() {
    this.allInvoices = this.invoices.filter(
      (item) => item.dueDate.slice(0, 7) === this.data
    );
    this.loadValues();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
  }
}
