import {Column, Entity, Index, OneToMany} from 'typeorm';
import {ISubject} from '../interface/subject.interface';
import {BaseModel} from '../../../bases/BaseModel';
import {AdvertEntity} from '../../advert/entity/advert.entity';

@Entity('subjects')
export class SubjectEntity extends BaseModel implements ISubject {
    @Index({unique: true})
    @Column()
    name: string;

    @OneToMany(type => AdvertEntity, advert => advert.subject)
    advert: AdvertEntity;

    constructor(name: string) {
        super();
        this.name = name;
    }
}
