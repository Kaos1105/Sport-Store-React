export interface IUser {
  id: number;
  userName: string;
  email: string;
  role: string;
  token: string;
}

export interface IUserFormValues {
  email: string;
  password: string;
  userName?: string;
  role: string;
}
