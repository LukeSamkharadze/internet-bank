import { Invoice } from './invoice.model';

export const sample: Invoice = {
  number: 'IO-BN-124',
  title: 'Vodafone LLC',
  address: {
    address1: 'Street Address 1',
    address2: 'Street Address 2',
    address3: 'Street Address 3',
    city: 'Edinburgh',
    country: 'Scotland',
    mail: 'marketing@vdfn.com',
  },
  date: '6 Aug 2018, 2:15 AM',
  due: '16 Aug 2018',
  tagColor: 'green',
  status: 'Paid',
  currency: '$',
  items: [
    {
      desc: 'Sample Item 1',
      rate: 50,
      qty: 150,
    },
    {
      desc: 'Sample Item 2',
      rate: 350,
      qty: 1,
    },
    {
      desc: 'Sample Item 3',
      rate: 550,
      qty: 2,
    },
    {
      desc: 'Sample Item 4',
      rate: 150,
      qty: 10,
    },
  ],
};
