import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-accounts-spendings',
  templateUrl: './accounts-spendings.component.html',
  styleUrls: ['./accounts-spendings.component.scss'],
})
export class AccountsSpendingsComponent implements OnInit {
  @Input()
  public debit = 0;

  @Input()
  public credit = 0;

  @Input()
  public cash = 0;

  @Input()
  public maxval = 0;

  public axisValues = [];
  constructor() {}

  ngOnInit(): void {
    if (
      this.maxval === 0 ||
      this.maxval < Math.max(this.debit, this.credit, this.cash)
    ) {
      this.maxval = Math.max(this.debit, this.credit, this.cash) * 1.1;
    }
    this.createAxisVals();
  }

  createAxisVals() {
    for (let i = 0; i <= this.maxval + 1; i += this.maxval / 6) {
      if (Math.round(i) > 1000 && Math.round(i) % 100 === 0) {
        this.axisValues.push(Math.round(i) / 1000 + 'k');
      } else if (Math.round(i) > 1000 && Math.round(i) % 100 !== 0) {
        this.axisValues.push((Math.round(i) / 1000).toFixed(1) + 'k');
      } else {
        this.axisValues.push(Math.round(i));
      }
    }
    console.log(this.maxval);
    console.log(this.axisValues);
  }
}
