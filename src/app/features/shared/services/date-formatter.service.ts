import { Injectable } from '@angular/core';

type IDay = 'd' | 'dd' | 'ddd' | 'dddd';
type IMonth = 'm' | 'mm' | 'mmm' | 'mmmm';
type IYear = 'y' | 'yy' | 'yyy' | 'yyyy';
type ISearchVal = 'd' | 'm' | 'y';

@Injectable({
  providedIn: 'root',
})
export class DateFormatterService {
  private readonly DAY_NAMES = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  private readonly MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  /**
   * Returns formatted date string according to year, month and day
   * @param template template date to be formatted according to
   * @param year year of date
   * @param month month of date
   * @param day day of date
   */
  formatDate(
    template: string,
    year: number = 1,
    month: number = 1,
    day: number = 1
  ): string {
    let date = template;

    ([
      [
        template.indexOf('d'),
        () =>
          (date = this.formatTemplate(
            date,
            'd',
            template,
            this.generateDay.bind(this),
            day
          )),
      ],
      [
        template.indexOf('m'),
        () =>
          (date = this.formatTemplate(
            date,
            'm',
            template,
            this.generateMonth.bind(this),
            month
          )),
      ],
      [
        template.indexOf('y'),
        () =>
          (date = this.formatTemplate(
            date,
            'y',
            template,
            this.generateYear.bind(this),
            year
          )),
      ],
    ] as Array<[number, () => string]>)
      .sort()
      .reverse()
      .forEach((v) => v[1]());

    return date;
  }

  generateDay(day: number, template: IDay): string {
    switch (template.length) {
      case 1:
        return day.toString();
      case 2:
        let str = day.toString();
        if (str.length < 2) {
          str = '0' + str;
        }
        return str;
      case 3:
        return this.DAY_NAMES[day % this.DAY_NAMES.length].substr(0, 3);
      case 4:
        return this.DAY_NAMES[day % this.DAY_NAMES.length];
    }
  }

  generateMonth(month: number, template: IMonth): string {
    switch (template.length) {
      case 1:
        return month.toString();
      case 2:
        let str = month.toString();
        if (str.length < 2) {
          str = '0' + str;
        }
        return str;
      case 3:
        return this.MONTH_NAMES[month % this.MONTH_NAMES.length].substr(0, 3);
      case 4:
        return this.MONTH_NAMES[month % this.MONTH_NAMES.length];
    }
  }

  generateYear(year: number, template: IYear): string {
    let str = year.toString();
    let nowYear = new Date().getFullYear().toString();
    if (nowYear.length < template.length) {
      nowYear = Array(template.length - nowYear.length + 1).join('0') + nowYear;
    }
    if (str.length < template.length) {
      str =
        nowYear.substr(
          nowYear.length - template.length,
          template.length - str.length
        ) + str;
    }
    str = str.substr(str.length - template.length, template.length);

    return str;
  }

  /**
   * Formats and returns string of date
   * @param strdate string of date which must be changed
   * @param searchVal character to search in template
   * @param template template according to which must be changed strdate
   * @param cb callback for generating day, month or year
   * @param num number of the day, month or year
   */
  private formatTemplate(
    strdate: string,
    searchVal: ISearchVal,
    template: string,
    cb: (n: number, template: IDay | IMonth | IYear) => string,
    num: number = 1
  ) {
    const { first, count: c } = this.getFirstCount(template, searchVal);
    const count = Math.min(c, 4);
    if (first === -1) {
      return strdate;
    }

    return (
      strdate.substr(0, first) +
      cb(num, Array(count + 1).join(searchVal) as IDay | IMonth | IYear) +
      strdate.substr(first + count)
    );
  }

  /**
   * Returns {first: number, count: number} format object,
   * containing first occurence of searchVal and number, how many time it occures in a row
   * @param str string where to find search value
   * @param searchVal string which has to be find
   */
  private getFirstCount(
    str: string,
    searchVal: string
  ): { first: number; count: number } {
    const first = str.indexOf(searchVal);
    let count = 0;
    if (first === -1) {
      return { first, count };
    }

    count = Array.from(str).findIndex((v, i) => i > first && v !== searchVal);
    if (count === -1) {
      count = str.length;
    }
    count -= first;
    return { first, count };
  }
}
