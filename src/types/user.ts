export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  acceptPrivacy: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}