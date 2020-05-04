import {PlaceType} from '../placeType';
import {LevelType} from '../advertLevelType';
import {Timestamp} from 'typeorm';

export class UpdateAdvertDto {
    id: string;
    subjectId: string;
    place: PlaceType;
    level: LevelType;
    dateFrom: Date;
    dateTo?: Date;
    time: Timestamp;
    price: number;
}
