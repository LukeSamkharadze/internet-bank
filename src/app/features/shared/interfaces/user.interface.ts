export interface IUser {
  id: number;
  fullname: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: number;
  language?: string;
  sex?: string;
}

export type ILoginData = Pick<IUser, 'email' | 'password'>;
