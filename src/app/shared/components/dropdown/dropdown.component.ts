import {
  Component,
  Input,
  TemplateRef,
  forwardRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-shared-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor, OnChanges {
  @Input() value: any;
  @Input() placeholder: any;
  @Input() options: any[] = [];

  @Input() placeholderTemplate: TemplateRef<any>;
  @Input() selectedTemplate: TemplateRef<any>;
  @Input() optionTemplate: TemplateRef<any>;
  @Input() arrowTemplate: TemplateRef<any>;

  isOptionsOpened = false;
  isPlaceholderOn = true;
  disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.isPlaceholderOn = !Boolean(this.value);
      this.onChange(this.value);
    }
  }

  dropdownClicked() {
    if (!this.disabled) {
      this.isOptionsOpened = !this.isOptionsOpened;
    }
  }

  optionClicked(option: any) {
    this.isPlaceholderOn = false;
    this.value = option;
    this.onChange(option);
  }

  writeValue(value: any) {
    this.isPlaceholderOn = !Boolean(value);
    this.value = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.isOptionsOpened = false;
  }

  registerOnChange(fn: (value: any) => any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any) {
    this.onTouched = fn;
  }
}
