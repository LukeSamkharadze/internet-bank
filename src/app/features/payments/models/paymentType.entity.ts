export interface PaymentType {
  name: string;
  providers: { title: string; iconPath?: string }[];
  icon?: string;
  formPath: string;
}
