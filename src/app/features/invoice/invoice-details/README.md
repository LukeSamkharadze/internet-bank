## **Usage**

_Us this component in your feature like this_

```HTML
<app-invoice-details
	*ngIf="popDetails"
	(closePopup)="closePopup()"
	[invoice]="invoiceObject">
</app-invoice-details>
```

where **popDetails** is a variable that is either true or false. If you want this modal to pop up then you should make popDetails **true**.

close is an event that is emitted when **(x)** button is pressed on popup. closePopup() function should be a function that makes popDetails variable **false**.

**invoice** is an input that should look like this

```TS
  id: number;
  template: string;
  invoiceNumber: string;
  dueDate: string;
  companyName: string;
  contactEmail: string;
  address: string; //Better if addresses are divided by commas(","), to add them on new line
  items: ItemsModel[];
  totalAmount: number;
  status: string; //Only 'Paid', 'Pending' or 'Cancelled'
  invoiceCreateDate: string;
```

every parameter is **_required_**. **ItemsModel** is also an interface that looks like this

```TS
  itemDescription: string,
  price: number,
  itemQty: number,
```

sample **invoiceObject**

```TS
  id: 54,
  template: 'website design',
  invoiceNumber: 'IO-BN-124',
  companyName: 'Vodafone LLC',
  contactEmail: 'mail@mail.com',
  address: 'Edinburgh, Scotland, Address1, Address2, Address3',
  invoiceCreateDate: '6 Aug 2018, 2:15 AM',
  dueDate: '16 Aug 2018',
  status: 'Cancelled',
  items: [
    {
      itemDescription: 'Sample Item 1',
      price: 50,
      itemQty: 150,
    },
    {
      itemDescription: 'Sample Item 2',
      price: 350,
      itemQty: 1,
    },
    {
      itemDescription: 'Sample Item 3',
      price: 550,
      itemQty: 2,
    },
    {
      itemDescription: 'Sample Item 4',
      price: 150,
      itemQty: 10,
    },
  ],
  totalAmount: 11495,
```
