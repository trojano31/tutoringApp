import {PlaceType} from '../placeType';
import {Timestamp} from 'typeorm';

export interface IAdvert {
    place: PlaceType;
    dateFrom: Date;
    dateTo: Date | null;
    time: Timestamp;
    price: number;
}
