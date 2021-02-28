# Usage

**_Use this component in your feature like this:_**

```
<app-shared-bank-transaction-details
	*ngIf="popDetails"
	(closePopup)="closePopup()"
  (sendReceipt)="sendReceipt()"
	[transaction]="transactionObject">
</app-shared-bank-transaction-details>
```

where **popDetails** is a variable that is either true or false. If you want this modal to pop up then you should make popDetails **true**.

closePopup is an event that is emitted when **(x)** button is pressed on popup. closePopup() function should be a function that makes popDetails variable **false**.

**sendReceipt** is an event that is emitted when **SEND RECEIPT** or _mail_ icon is presssed.

**transaction** is an input that has Itransaction interface:

```
id: number;
title: string;
iconPath: string;
type: string;
beneficiary: string;
amount: string;
date: string;
status: string;
fromAccountNumber: number;
toAccountNumber: number;
fromAccountUserId: number;
bankTransferType: string;
toUserId: number;
currency: string;
```

every parameter is **required**. iconPath should be an img url.

sample **transactionObject**:

```
  title: "Bank transfer to user: 3",
  toUserId: 3,
  date: "2021-02-28T16:39:38.183Z",
  type: "bank",
  fromAccountUserId: 2,
  fromAccountNumber: 3333111122224444,
  toAccountNumber: 1111222233334444,
  amount: '20',
  currency: "USD",
  beneficiary: "gamarjoba batono obama",
  bankTransferType: "personal transfer",
  status: "pending",
  id: 1,
  iconPath: './assets/transfers/default.png'
```
