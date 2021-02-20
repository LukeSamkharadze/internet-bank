export default interface IParent {
  id: number;
  accountNumber: string;
  expirationDate: string;
  balance?: number;
  blocked?: boolean;
}
