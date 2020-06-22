export interface IUser {
  id: number;
  userName: string;
  email: string;
  isAdmin: boolean;
}

export interface IUserFormValues {
  email: string;
  password: string;
  userName?: string;
}
