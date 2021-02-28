export interface PaymentType {
  name: string;
  providers: { name: string; iconPath?: string }[];
  icon?: string;
  formPath: string;
}
