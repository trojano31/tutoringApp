import {Column, Entity, JoinTable, ManyToOne, Timestamp} from 'typeorm';
import {BaseModel} from '../../../bases/BaseModel';
import {IAdvert} from '../interface/advert.interface';
import {PlaceType} from '../placeType';
import {UserEntity} from '../../user/entity/user.entity';
import {SubjectEntity} from '../../subject/entity/subject.entity';
import {LevelType} from '../advertLevelType';

@Entity('adverts')
export class AdvertEntity extends BaseModel implements IAdvert {
    @Column('date')
    dateFrom: Date;
    @Column('date')
    dateTo: Date | null;
    @Column('enum', {
        enum: PlaceType,
    })
    place: PlaceType;
    @Column('enum', {
        enum: LevelType,
    })
    level: LevelType;
    @Column('decimal')
    price: number;
    @Column('time')
    time: Timestamp;
    @ManyToOne(type => UserEntity, user => user.teacherAdverts)
    teacher: UserEntity;
    @Column({nullable: false})
    teacherId: string;
    @ManyToOne(type => UserEntity, user => user.studentAdverts)
    student: UserEntity;
    @Column({nullable: true})
    studentId: string;
    @ManyToOne(type => SubjectEntity, subject => subject.advert)
    subject: SubjectEntity;
    @Column()
    subjectId: string;
    @Column({nullable: true})
    isDeleted?: boolean;

    constructor(dateFrom: Date,
                dateTo: Date,
                place: PlaceType,
                level: LevelType,
                price: number,
                time: Timestamp,
                teacherId: string,
                subjectId: string) {
        super();
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.place = place;
        this.level = level;
        this.price = price;
        this.time = time;
        this.teacherId = teacherId;
        this.subjectId = subjectId;
    }
}
