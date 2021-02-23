import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Invoice } from '../../interfaces/invoice-models.interface/invoice.model';
import { sample } from '../../interfaces/invoice-models.interface/sample.model';

@Component({
  selector: 'app-shared-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent {
  showTag = true;
  @Input() invoice: Invoice = sample;

  @Output() closePopup = new EventEmitter();

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

  closeTag() {
    this.showTag = false;
  }
}
