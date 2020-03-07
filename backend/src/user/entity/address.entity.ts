import { Entity, Column } from 'typeorm';
import { BaseModel } from '../../../bases/BaseModel';
import { IAddress } from '../interfaces/address.interface';

@Entity()
export class Address extends BaseModel implements IAddress {
  @Column()
  city: string;

  @Column()
  street: string;
}
