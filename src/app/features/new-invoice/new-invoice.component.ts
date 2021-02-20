import { Component, OnInit } from '@angular/core';
import {
  FormArray,
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
  items: FormArray;
  templateOptions = templateOptions.templateOptions;
  itemQtyOptions = itemQtyOptions.itemQtyOptions;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
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
      items: this.fb.array([this.createItem()]),
    });
  }

  addItem(): void {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemDescription: new FormControl('', Validators.required),
      itemQty: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0.1)]),
    });
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  chengeValueType() {
    const controls = 'controls';
    const price = 'price';
    this.form
      .get('invoiceNumber')
      .setValue(parseInt(this.form.get('invoiceNumber').value, 10));

    for (const i in this.items[controls]) {
      if (this.items[controls].hasOwnProperty(i)) {
        this.items[controls][i][controls][price].setValue(
          parseInt(this.items[controls][i][controls][price].value, 10)
        );
      }
    }
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
