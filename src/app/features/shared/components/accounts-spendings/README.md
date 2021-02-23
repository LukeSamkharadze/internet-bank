### **USAGE**

`<app-shared-accounts-spendings [debit]="48000" [credit]="15000" [cash]="30000" [maxval]="60000"></app-shared-accounts-spendings>`

where **_debit_** attribute is amount of money spend with a debit card, **_credit_** - with credit card and **_cash_** with cash.

**_maxval_** is maximum value of value axis. This field is optional. Its value (by default) is 110% of largest input element.

If **_maxval_** is less than any input element (debit, credit, cash), then maxval evaluates its default value.
