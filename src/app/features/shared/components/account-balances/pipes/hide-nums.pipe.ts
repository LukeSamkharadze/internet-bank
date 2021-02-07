import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideNums',
})
export class HideNumsPipe implements PipeTransform {
  transform(value: any): any {
    let arr = value.split(' ');
    let checkVal = true;
    myLoop: for (let j of arr) {
      if (j * 2) {
        checkVal = true;
      } else {
        checkVal = false;
        break myLoop;
      }
    }

    if (checkVal) {
      arr.splice(1, 2, ' **** **** ');
      return arr.join('');
    } else {
      return value;
    }
  }
}
