import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideNums',
})
export class HideNumsPipe implements PipeTransform {
  transform(value: any): any {
    const val = value.toString();
    const arr = val.split('');
    arr.splice(4, 8, ' **** **** ');
    return arr.join('');
  }
}
