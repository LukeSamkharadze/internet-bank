import { Component, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-shared-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
    { provide: NG_VALIDATORS, useExisting: CheckboxComponent, multi: true },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id = null;
  @Input() textBefore = false;
  @Input() checked = false;
  @Input() disabled = false;
  @Input() checkboxError = false;
  @Input() required: boolean | string;
  isChecked = false;
  onChange = (_) => {};
  onBlur = (_) => {};
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (this.required || this.required === '') {
      control.markAsTouched();
      return control.value + '' !== 'true'
        ? {
            appRequiredTrue: {
              message: 'Field required',
              value: control.value,
            },
          }
        : null;
    }
    return null;
  }

  checkDisabled() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
    }
  }
  writeValue(obj: boolean): void {
    this.isChecked = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChanged($event) {
    this.isChecked = $event && $event.target && $event.target.checked;
    this.onChange(this.isChecked);
  }
}
