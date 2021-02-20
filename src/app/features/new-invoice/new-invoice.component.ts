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
  providers: [InvoiceService],
})
export class NewInvoiceComponent implements OnInit {
  form: FormGroup;
  items: FormArray;

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

    this.items = this.form.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemDescription: new FormControl('', Validators.required),
      itemQty: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0.1)]),
    });
  }

  chengeValueType() {
    const controls = 'controls';
    const price = 'price';

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
