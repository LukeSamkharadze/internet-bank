## **Usage**

_Us this component in your feature like this_

```HTML
<app-shared-invoice-details
	*ngIf="popDetails"
	(close)="closePopup()"
	[invoice]="invoiceObject">
</app-shared-invoice-details>
```

where **popDetails** is a variable that is either true or false. If you want this modal to pop up then you should make popDetails **true**.

close is an event that is emitted when **(x)** button is pressed on popup. closePopup() function should be a function that makes popDetails variable **false**.

**invoice** is an input that should look like this

```TS
number: string,
title: string,
address: {
	address1: string,
	address2?: string,
	address3?: string,
	city: string,
	country: string,
	mail: string
    },
date: string,
due: string,
tagColor: string, //only these colors are available: white,cyan,green,orange,pink,gray
status: string,
currency: string, //currency symbol, like this "$", "₾"
items: Item[]
```

every parameter is **_required_**. **Item** is also an interface that looks like this

```TS
desc: string,
rate: number,
qty: number,
```

sample **invoiceObject**

```TS
number: 'IO-BN-124',
    title: 'Vodafone LLC',
    address: {
      address1: '44-46 Morningside Road',
      address2: 'EH10 4BF',
      address3: 'Department 98',
      city: 'Edinburgh',
      country: 'Scotland',
      mail: 'marketing@vdfn.com'
    },
    date: '6 Aug 2018, 2:15 AM',
    due: '16 Aug 2018',
    tagColor: 'green',
    status: 'Paid',
    currency: '$',
    items: [
      {
        desc: 'Marketing materials',
        rate: 50,
        qty: 150
      },
      {
        desc: 'Website design',
        rate: 350,
        qty: 1
      },
      {
        desc: 'Mobile app',
        rate: 550,
        qty: 2
      },
      {
        desc: 'Printing equipment',
        rate: 150,
        qty: 10
      }
    ]
  }
```
