import { BaseModel } from '../../../bases/BaseModel';
import {BeforeInsert, Column, Entity, Index, ManyToOne, OneToMany, OneToOne} from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import {AdvertEntity} from '../../advert/entity/advert.entity';
import {CityEntity} from './city.entity';

@Entity()
export class UserEntity extends BaseModel implements IUser {
  @Column()
  @Index({unique: true})
  email: string;

  @Column()
  hashedPwd: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(type => AdvertEntity, advert => advert.teacher)
  teacherAdverts: AdvertEntity[];

  @OneToMany(type => AdvertEntity, advert => advert.student)
  studentAdverts: AdvertEntity[];

  @ManyToOne(type => CityEntity, city => city.users)
  city: CityEntity;

  @BeforeInsert()
  async hashPassword() {
    this.hashedPwd = await bcrypt.hash(this.hashedPwd, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.hashedPwd);
  }

  constructor(email: string, hashedPwd: string, firstName: string, lastName: string, city: CityEntity, phone: string) {
    super();
    this.email = email;
    this.hashedPwd = hashedPwd;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.phone = phone;
  }
}
