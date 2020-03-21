import { BaseModel } from '../../../bases/BaseModel';
import { Column, OneToOne } from 'typeorm';
import { Address } from './address.entity';
import { IUser } from '../interfaces/user.interface';

export class User extends BaseModel implements IUser{
  @Column()
  email: string;

  @Column()
  hashedPwd: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(type => Address)
  address: Address;

  @Column()
  phone: string;
}
