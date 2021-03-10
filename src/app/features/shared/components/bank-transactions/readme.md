# Usage

**_Use this component in your feature like this:_**

**_A) Search bar is a default_**

```
  <app-features-shared-bank-transactions>
 </app-features-shared-bank-transactions>

```

**_B) if you want to hide SearchBar and Type Dropdown, also give ACCOUNT NUMBER as an input you should give an input property to a tag. (lets give the following title: "Latest Transactions") and hide all above mentioned _**

```
  <app-features-shared-bank-transactions
  [input]="'GE32TB4434234223333333'">
  Latest Transactions
  </app-features-shared-bank-transactions>

```

**_C) if you need to get Debit/Credit Transactions go to features/shared/services_**
