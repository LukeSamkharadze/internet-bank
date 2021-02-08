import { Component, Input, TemplateRef, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  SelectControlValueAccessor,
} from '@angular/forms';
import { FeaturesSharedModule } from '@features/shared';

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
export class DropdownComponent implements ControlValueAccessor {
  @Input() value: any;
  @Input() placeholder: any;
  @Input() options: any[] = [];

  @Input() placeholderTemplate: TemplateRef<any>;
  @Input() selectedTemplate: TemplateRef<any>;
  @Input() optionTemplate: TemplateRef<any>;

  isOptionsOpened = false;
  isPlaceholderOn = true;
  disabled = false;

  onChange: (_: any) => void;
  onTouched: () => void;

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled);
    // throw new Error('Method not implemented.');
  }

  dropdownClicked() {
    this.isOptionsOpened = !this.isOptionsOpened;
  }

  optionClicked(option: any) {
    this.isPlaceholderOn = false;
    this.value = option;
    this.onChange(option);
  }
}
