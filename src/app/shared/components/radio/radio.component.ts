import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioBtnType } from './types/radio-type';

@Component({
  selector: 'app-shared-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements AfterViewInit, ControlValueAccessor {
  @Input() buttons: RadioBtnType[];
  @Input() isDisabled = false;
  @Input() checkError = false;
  @ViewChildren('text') textQuery: QueryList<ElementRef>;
  public radioValue: string | number | boolean;

  ngAfterViewInit(): void {
    // console.log(this.radioWrapper.nativeElement.clientWidth-25);
    this.textQuery.map((text) => {
      if (text.nativeElement.innerText.length > 20) {
        text.nativeElement.innerText =
          text.nativeElement.innerText.slice(0, 20) + '...';
      }
    });
  }

  change(setValue: string | number | boolean) {
    this.radioValue = setValue;
    this.onChange(setValue);
    this.onTouched(setValue);
  }

  onChange: any = (value) => {};
  onTouched: any = () => {};

  writeValue(value: string | number | boolean): void {
    if (value !== this.radioValue) {
      this.radioValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  changeRadio(index) {
    if (!this.isDisabled) {
      this.change(this.buttons[index].value);
    }
  }
}
