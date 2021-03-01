import {
  Component,
  Input,
  TemplateRef,
  forwardRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { optionsAnimation } from './animations/options';

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
  animations: [optionsAnimation],
})
export class DropdownComponent implements ControlValueAccessor, OnChanges {
  @Input() placeholderTemplate: TemplateRef<any>;
  @Input() selectedTemplate: TemplateRef<any>;
  @Input() optionTemplate: TemplateRef<any>;
  @Input() arrowTemplate: TemplateRef<any>;

  @Input() placeholder = '';
  @Input() options = [];
  @Input() value = '';

  isOptionsOpened = false;
  isPlaceholderOn = true;
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.isPlaceholderOn = !Boolean(this.value);
      this.onChange(this.value);
    }

    this.disabled = this.disabled || !this.options.length;
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
