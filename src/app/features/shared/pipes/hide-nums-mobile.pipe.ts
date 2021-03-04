import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideNumsMobile',
})
export class HideNumsMobilePipe implements PipeTransform {
  transform(value: any): any {
    const val = value.toString();
    const arr = val.split('');
    arr.splice(4, 8, ' **** ');
    return arr.join('');
  }
}
