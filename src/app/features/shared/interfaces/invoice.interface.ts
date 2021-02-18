export interface Invoice {
  id: number;
  tamplate: string;
  invoiceNumber: number;
  dueDate: string;
  companyName: string;
  contanctEmail: string;
  address: string;
  itemDescription: string;
  itemQty: number;
  price: number;
}
