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

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
})
export class NewInvoiceComponent implements OnInit {
  form: FormGroup;
  items: FormArray;
  totalAmount = 0;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      template: new FormControl('', Validators.required),
      invoiceNumber: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      contactEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ]),
      address: new FormControl('', Validators.required),
      items: this.fb.array([this.createItem()]),
    });

    this.items = this.form.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemDescription: new FormControl('', Validators.required),
      itemQty: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  calculateTotalAmount() {
    const controls = 'controls';
    const price = 'price';
    const itemQty = 'itemQty';

    for (const i in this.items[controls]) {
      if (this.items[controls].hasOwnProperty(i)) {
        this.items[controls][i][controls][price].setValue(
          parseInt(this.items[controls][i][controls][price].value, 10)
        );
        this.totalAmount +=
          this.items[controls][i][controls][price].value *
          this.items[controls][i][controls][itemQty].value;
      }
    }
  }

  onSubmit() {
    const createDate = new Date();
    this.calculateTotalAmount();

    const invoiceObj = {
      ...this.form.getRawValue(),
      totalAmount: this.totalAmount,
      status: 'Pending',
      invoiceCreateDate: createDate,
    };

    this.invoiceService
      .create(invoiceObj)
      .pipe(
        finalize(() => {
          this.form.reset();
          window.alert('add new invoice successfully');
          this.invoiceService.emitToSocket();
        })
      )
      .subscribe();

    this.totalAmount = 0;
  }

  onCencel() {
    this.form.reset();
  }
}
