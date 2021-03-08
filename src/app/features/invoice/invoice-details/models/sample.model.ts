import { Invoice } from '../../../shared/interfaces/invoice.interface';

export const sample: Invoice = {
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
};
