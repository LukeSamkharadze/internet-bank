import {
  fadeInOut,
  fadeInOutTimeout,
} from '../shared/animations/textAnimations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  animations: [fadeInOut],
})
export class InvoiceComponent {}
