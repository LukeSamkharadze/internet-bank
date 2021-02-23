interface ItemsModel {
  itemDescription: string;
  itemQty: number;
  price: number;
}

export interface Invoice {
  id: number;
  template: string;
  invoiceNumber: string;
  dueDate: string;
  companyName: string;
  contanctEmail: string;
  address: string;
  items: ItemsModel[];
}