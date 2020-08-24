import {CityEntity} from '../entity/city.entity';

export interface IUser {
  email: string;
  hashedPwd: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: CityEntity;
}
