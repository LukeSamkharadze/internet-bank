import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  print() {
    window.print();
  }
}
