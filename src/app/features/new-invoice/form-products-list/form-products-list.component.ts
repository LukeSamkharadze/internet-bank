import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import * as itemQtyOptions from '../dropdown-options/item-qty-dropdown';

@Component({
  selector: 'app-form-products-list',
  templateUrl: './form-products-list.component.html',
  styleUrls: ['./form-products-list.component.scss'],
})
export class FormProductsListComponent {
  @Input() form: FormGroup;

  itemQtyOptions = itemQtyOptions.itemQtyOptions;
  items: FormArray;

  constructor(private fb: FormBuilder) {}

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
}
