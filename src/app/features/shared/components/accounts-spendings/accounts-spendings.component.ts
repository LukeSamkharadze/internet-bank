import { Component, Input, OnInit } from '@angular/core';
import { Spendings } from './spendings.model';

@Component({
  selector: 'app-shared-accounts-spendings',
  templateUrl: './accounts-spendings.component.html',
  styleUrls: ['./accounts-spendings.component.scss'],
})
export class AccountsSpendingsComponent implements OnInit {
  @Input()
  public spendings: Spendings;

  public axisValues = [];

  ngOnInit(): void {
    if (this.spendings.maxval === 0 || !this.spendings.maxval) {
      this.spendings.maxval = Math.max(
        this.spendings.debit,
        this.spendings.credit,
        this.spendings.cash
      );
    } else if (
      this.spendings.maxval <=
      Math.max(this.spendings.debit, this.spendings.credit, this.spendings.cash)
    ) {
      this.spendings.maxval = Math.max(
        this.spendings.debit,
        this.spendings.credit,
        this.spendings.cash
      );
    }
    this.createAxisVals();
  }

  createAxisVals() {
    const max = this.spendings.maxval;
    const interval = max / 5;
    for (let i = 0; i <= max; i += interval) {
      if (Math.round(i) >= 1000 && Math.round(i) % 100 === 0) {
        this.axisValues.push(Math.round(i) / 1000 + 'k');
      } else if (Math.round(i) >= 1000 && Math.round(i) % 100 !== 0) {
        this.axisValues.push((Math.round(i) / 1000).toFixed(1) + 'k');
      } else if (!Number.isInteger(i)) {
        this.axisValues.push(i.toFixed(1));
      } else {
        this.axisValues.push(i);
      }
    }
  }
}
