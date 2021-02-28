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

**transaction** is an input that should be like this

```
title: string,
status: string,
cardNumber: number,
amount: string,
date: string,
icon: string
```

every parameter is **required**. Icon should be an img url.

sample **transactionObject**:

```
title: 'ATM Cash Withdrawal',
status: 'Paid',
tagColor: 'green',
cardNumber: 9872,
amount: '- $201.12',
date: '2021/02/02 11:42 PM',
icon: 'https://miro.medium.com/max/10368/1*o8tTGo3vsocTKnCUyz0wHA.jpeg'
```
