import {PaginationDto} from '../../common/paginationDto';
import {PlaceType} from '../placeType';
import {LevelType} from '../advertLevelType';

export class AdvertFilter extends PaginationDto {
    subjectId: number;
    place: PlaceType;
    level: LevelType;
    priceFrom?: number;
    priceTo: number;
    cityId?: string;
}
