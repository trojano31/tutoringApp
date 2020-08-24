import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {getRepository, Repository} from 'typeorm';
import {CityEntity} from './entity/city.entity';
import {PaginatedResult} from '../common/PaginatedResult';
import {CityDto} from './dto/cityDto';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly citiesRepository: Repository<CityEntity>,
    ) {
    }

    async findOneByName(name: string): Promise<CityEntity | undefined> {
        return await this.citiesRepository.findOne({name});
    }

    async createIfNotExists(name: string): Promise<CityEntity | undefined> {
        const city = await this.findOneByName(name);
        if (city != null) {
            return city;
        }
        const entity = CityEntity.create(new CityEntity(name));
        return await this.citiesRepository.save(entity);
    }

    async findAllPaginated(page: number, itemsPerPage: number, filter: string): Promise<PaginatedResult<CityDto> | undefined> {
        page = page > 0 ? page : 1;

        let queryBuilder = await getRepository(CityEntity)
            .createQueryBuilder('city');

        if (filter != null) {
            queryBuilder = await queryBuilder
                .where('upper(city.name) like upper(:name)', {name: `%${filter}%`});
        }

        const entities = await queryBuilder
            .skip((page - 1) * itemsPerPage)
            .take(itemsPerPage)
            .orderBy('name', 'ASC')
            .getMany();

        const count = await queryBuilder.getCount();
        const hasNext = (page + 1) * itemsPerPage < count;
        const hasPrev = (page - 1) * itemsPerPage > 0;
        return new PaginatedResult<CityDto>(
            entities.map(item => new CityDto(
                item.id,
                item.name),
            ),
            count,
            hasNext,
            hasPrev);
    }
}
