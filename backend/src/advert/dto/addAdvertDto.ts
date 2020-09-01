import {PlaceType} from '../placeType';
import {LevelType} from '../advertLevelType';
import {Timestamp} from 'typeorm';

export class AddAdvertDto {
    subject: string;
    teacherId: string;
    place: PlaceType;
    level: LevelType;
    dateFrom: Date;
    dateTo?: Date;
    time: Timestamp;
    price: number;

    constructor(subject: string,
                teacherId: string,
                place: PlaceType,
                level: LevelType,
                dateFrom: Date,
                dateTo: Date,
                time: Timestamp,
                price: number) {
        this.subject = subject;
        this.teacherId = teacherId;
        this.place = place;
        this.level = level;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.time = time;
        this.price = price;
    }
}
