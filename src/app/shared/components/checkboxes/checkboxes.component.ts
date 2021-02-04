import {
  AfterViewInit,
  ElementRef,
  Self,
  ViewChild,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-shared-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
})
export class CheckboxesComponent
  implements ControlValueAccessor, Validator, OnInit {
  @ViewChild('input') input: ElementRef;
  @Input() textBefore = false;
  @Input() checkboxType = 'uncheck';
  @Input() isRequired = false;
  @Input() checked = false;
  @Input() disabled = false;
  @Input() checkboxError = '';
  defaultValue: any;
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    const validators: ValidatorFn[] = control.validator
      ? [control.validator]
      : [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  onChange(event) {}

  onTouched = () => {};

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const validators: ValidatorFn[] = [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    return validators;
  }
}
