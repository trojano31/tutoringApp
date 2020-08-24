import {Column, Entity, OneToMany} from 'typeorm';
import {ICity} from '../interfaces/city.inteface';
import {UserEntity} from './user.entity';
import {BaseModel} from '../../../bases/BaseModel';

@Entity()
export class CityEntity extends BaseModel implements ICity {
    @Column()
    name: string;

    @OneToMany(type => UserEntity, user => user.city)
    users: UserEntity[];

    constructor(name: string) {
        super();
        this.name = name;
    }
}
