import {PlaceType} from '../placeType';
import {LevelType} from '../advertLevelType';
import {Timestamp} from 'typeorm';
import {SubjectDto} from '../../subject/subjectDto';
import {UserEntity} from '../../user/entity/user.entity';
import {UserDto} from "../../user/dto/userDto";

export class AdvertDto {
    id: string;
    place: PlaceType;
    level: LevelType;
    dateFrom: Date;
    dateTo?: Date;
    time: Timestamp;
    price: number;
    subject: SubjectDto;
    teacher: UserDto;

    constructor(id: string,
                place: PlaceType,
                level: LevelType,
                dateFrom: Date,
                dateTo: Date,
                time: Timestamp,
                price: number,
                subject: SubjectDto,
                teacher: UserDto) {
        this.id = id;
        this.place = place;
        this.level = level;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.time = time;
        this.price = price;
        this.subject = subject;
        this.teacher = teacher;
    }
}
