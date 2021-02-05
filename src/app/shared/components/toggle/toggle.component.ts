import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
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
  ],
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
  @Input() toggleType: string;
  public toggle = new FormControl('');
  private onChange: () => void;
  private onTouched: () => void;

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

  toggleisDisabled(): boolean {
    if (this.toggleType === 'on-disable' || this.toggleType === 'off-disable') {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.setDisabledState(this.toggleisDisabled());
  }
}
