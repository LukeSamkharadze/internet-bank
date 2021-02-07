import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
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
    { provide: NG_VALIDATORS, useExisting: ToggleComponent, multi: true },
  ],
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
  @Input() textBefore = false;
  @Input() checked = false;
  @Input() disabled = false;
  @Input() checkboxError = false;
  @Input() required: boolean | string;
  @Input() toggleType;
  @Input() toggleId;
  isChecked = false;
  control: AbstractControl;
  public toggleClass;
  onChange = (_) => {};
  onBlur = (_) => {};

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (this.required || this.required === '') {
      this.control = control;
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
      this.control.markAsTouched();
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

  setToggleClass() {
    if (this.disabled !== false && this.checked) {
      this.toggleClass = 'on-disabled';
    } else if (this.disabled !== false && !this.checked) {
      this.toggleClass = 'off-disabled';
    } else if (this.toggleType === 'success') {
      this.toggleClass = 'success-on';
    } else if (this.toggleType === 'error') {
      this.toggleClass = 'error-off';
    }
  }

  ngOnInit(): void {
    this.setToggleClass();
  }
}
