export default interface IParent {
  id: number;
  userId: string;
  accountNumber: string;
  expirationDate: string;
  balance?: number;
  blocked?: boolean;
}
