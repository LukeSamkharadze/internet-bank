import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  AbstractControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-shared-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ToggleComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ToggleComponent,
    },
  ],
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
  @Input() toggleType: string;
  @Input() checked: boolean | string;
  @Input() required: boolean | string;

  public toggle;
  private onChange: () => void;
  private onTouched: () => void;

  validate(): void {
    if (this.required || this.required === '') {
      this.toggle = new FormControl('', [Validators.requiredTrue]);
    } else {
      this.toggle = new FormControl();
    }
    if (this.checked === '') {
      this.checked = true;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  writeValue(obj: any): void {
    console.log(obj);
    this.toggle.setValue(obj);
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.toggle.disable();
    } else {
      this.toggle.enable();
    }
  }
  doBlur() {
    this.onTouched();
  }

  toggleisDisabled(): boolean {
    if (
      this.toggleType === 'off-disabled' ||
      this.toggleType === 'on-disabled'
    ) {
      this.toggleType === 'off-disabled'
        ? this.toggle.setValue(false)
        : this.toggle.setValue(true);
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.validate();
    this.toggle.setValue(this.checked);
    this.setDisabledState(this.toggleisDisabled());
  }
}
