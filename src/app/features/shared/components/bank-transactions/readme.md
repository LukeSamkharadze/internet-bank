# Usage

**_Use this component in your feature like this:_**

**_A) if you want to use Search bar_**

```
  <app-shared-bank-transactions
      [input]="'string'">
 </app-shared-bank-transactions>

```

**_B) if you want to give ANY title (for instance, lets give the following title: "Latest Transactions" _**

```
  <app-shared-bank-transactions>
  Latest Transactions
  </app-shared-bank-transactions>

```

where **show** is a variable that is either true or false. If you want "type dropdown" to hide then you should make show **false**.
