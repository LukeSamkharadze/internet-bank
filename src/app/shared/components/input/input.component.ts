import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  Self,
  AfterViewInit,
  HostListener,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-shared-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent
  implements ControlValueAccessor, OnInit, AfterViewInit {
  defaultValue = null;
  disabled = false;

  @Input() inputId = '';
  @Input() type = 'text';
  @Input() placeholder = 'Placeholder';
  @Input() isRequired = false;
  @Input() pattern: string = null;
  @Input() validated = true;

  @ViewChild('inputElement', { static: true }) input: ElementRef;

  @Output() focused: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('tabindex') tabindex = 0;

  @HostListener('focusin')
  public onFocus() {
    this.focused.emit(true);

    console.log('focus my-div');
  }

  onChange = (val) => {};
  onTouched = () => {};

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {
    if (!obj) {
      obj = '';
    }
    if (this.input && this.input.nativeElement) {
      this.input.nativeElement.value = obj;
    } else {
      this.defaultValue = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators: ValidatorFn[] = control.validator
      ? [control.validator]
      : [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  ngAfterViewInit(): void {
    this.writeValue(this.defaultValue);
  }
}
