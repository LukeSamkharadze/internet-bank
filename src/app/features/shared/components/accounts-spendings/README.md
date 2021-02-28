### **USAGE**

`<app-shared-accounts-spendings [spendings]="{debit: '20', credit: '50', cash: '80', maxval: '100'}"></app-shared-accounts-spendings>`

**_spendings_** attribute gets object as a parameter, where **_debit_** is amount of money spend with a debit card, **_credit_** - with credit card and **_cash_** with cash.

**_maxval_** is maximum value of value axis. **This field is optional**. Its value (by default) is value of largest input element.

If **_maxval_** is less than any input element (debit, credit, cash), then maxval evaluates its default value.
