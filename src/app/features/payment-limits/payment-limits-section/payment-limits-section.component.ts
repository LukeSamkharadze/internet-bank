import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-payment-limits-section',
  templateUrl: './payment-limits-section.component.html',
  styleUrls: ['./payment-limits-section.component.scss'],
})
export class PaymentLimitsSectionComponent
  implements OnInit, ControlValueAccessor {
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  isLess = false;

  inputForm = new FormControl();

  currency = 'USD';

  @Input() spending = 0;

  @Input() title = '';

  @Input() currentName: string;

  @ViewChild('inputElement', { static: true }) input1: ElementRef;

  @Output() shChange = new EventEmitter<object>();
  public value: number;
  public changed: (value: string) => void;
  public touched: () => void;
  public isDisabled = false;

  ngOnInit(): void {
    this.controlDir.valueChanges.subscribe((val) => {
      if (val < 0) {
        this.inputForm.patchValue(0);
      }

      const arr = Array.from(String(val), Number).length;
      this.input1.nativeElement.style.width = arr * 7.5 + 5 + 'px';

      this.isLess = val < this.spending;
    });
  }

  writeValue(value: number): void {
    this.input1.nativeElement.value = value;
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  onPlus() {
    if (this.input1.nativeElement.value) {
      this.input1.nativeElement.value =
        parseInt(this.input1.nativeElement.value, 10) + 1000;
    } else {
      this.input1.nativeElement.value = 1000;
    }

    this.regulateWidth();
  }
  onMinus() {
    if (
      this.input1.nativeElement.value &&
      this.input1.nativeElement.value - 1000 >= 0
    ) {
      this.input1.nativeElement.value =
        parseInt(this.input1.nativeElement.value, 10) - 1000;
    }
    this.regulateWidth();
  }

  regulateWidth() {
    const arr = Array.from(String(this.input1.nativeElement.value), Number)
      .length;
    this.input1.nativeElement.style.width = arr * 7.5 + 5 + 'px';
    this.shChange.emit({
      data: parseInt(this.input1.nativeElement.value, 10),
      name: this.currentName,
    });
  }
}
