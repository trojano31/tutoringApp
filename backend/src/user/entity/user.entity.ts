import { BaseModel } from '../../../bases/BaseModel';
import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import { Address } from './address.entity';
import { IUser } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseModel implements IUser {
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

  @BeforeInsert()
  async hashPassword() {
    this.hashedPwd = await bcrypt.hash(this.hashedPwd, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.hashedPwd);
  }
}
