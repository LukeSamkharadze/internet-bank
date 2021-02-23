import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as templateOptions from '../dropdown-options/template-dropdown';

@Component({
  selector: 'app-form-invoice-details',
  templateUrl: './form-invoice-details.component.html',
  styleUrls: ['./form-invoice-details.component.scss'],
})
export class FormInvoiceDetailsComponent {
  @Input() form: FormGroup;

  templateOptions = templateOptions.templateOptions;
  inputFocus: boolean;
}
