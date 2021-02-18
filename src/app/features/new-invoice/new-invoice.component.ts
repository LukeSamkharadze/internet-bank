import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { InvoiceService } from '../shared/services/invoice.service';
import * as itemQtyOptions from './dropdown-options/item-qty-dropdown';

import * as templateOptions from './dropdown-options/template-dropdown';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
  providers: [InvoiceService],
})
export class NewInvoiceComponent implements OnInit {
  form: FormGroup;
  templateOptions = templateOptions.templateOptions;
  itemQtyOptions = itemQtyOptions.itemQtyOptions;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      tamplate: new FormControl('', Validators.required),
      invoiceNumber: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      contanctEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ]),
      address: new FormControl('', Validators.required),
      itemDescription: new FormControl('', Validators.required),
      itemQty: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  chengeValueType() {
    this.form
      .get('invoiceNumber')
      .setValue(parseInt(this.form.get('invoiceNumber').value, 10));

    this.form.get('price').setValue(parseInt(this.form.get('price').value, 10));
  }

  onSubmit() {
    this.chengeValueType();

    this.invoiceService
      .create(this.form.getRawValue())
      .pipe(
        finalize(() => {
          this.form.reset();
          window.alert('add new invoice successfully');
        })
      )
      .subscribe();
  }

  onCencel() {
    this.form.reset();
  }
}
