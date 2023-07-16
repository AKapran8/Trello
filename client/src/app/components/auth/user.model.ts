export interface IUser {
  email: string;
  password: string;
}

export interface INewUser extends IUser {
  username?: string;
}

export interface IUserAuthResponse {
  email: string;
  id: number;
}