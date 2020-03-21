import { Address } from '../entity/address.entity';

export interface IUser {
  email: string;
  hashedPwd: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
}