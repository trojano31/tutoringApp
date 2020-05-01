import {Column, Entity, Index} from 'typeorm';
import {ISubject} from '../interface/subject.interface';
import {BaseModel} from '../../../bases/BaseModel';

@Entity('subjects')
export class SubjectEntity extends BaseModel implements ISubject {
    @Index({unique: true})
    @Column()
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}
