import {forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from './entity/user.entity';
import {createQueryBuilder, getRepository, Repository} from 'typeorm';
import {AddUserDto} from './dto/addUserDto';
import {CityService} from './city.service';
import {PaginatedResult} from '../common/PaginatedResult';
import {UserDto} from './dto/userDto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        @Inject(forwardRef(() => CityService))
        private readonly cityService: CityService,
    ) {
    }

    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.usersRepository.findOne({email});
    }

    async findById(id: string): Promise<UserDto | undefined> {
        const item = await getRepository(UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.city', 'city')
            .where({id})
            .getOne();

        if (item == null) {
            throw new NotFoundException();
        }

        return new UserDto(item.id,
            item.email,
            item.firstName,
            item.lastName,
            item.lastName,
            item.city);
    }

    async findAllPaginated(page: number, itemsPerPage: number, filter: string): Promise<PaginatedResult<UserDto>> {

        page = page > 0 ? page : 1;

        let queryBuilder = await getRepository(UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.city', 'city');

        if (filter != null) {
            queryBuilder = await queryBuilder
                .where('upper(user.name) like upper(:name)', {name: `%${filter}%`});
        }

        const entities = await queryBuilder
            .skip((page - 1) * itemsPerPage)
            .take(itemsPerPage)
            .getMany();

        const count = await queryBuilder.getCount();
        const hasNext = (page + 1) * itemsPerPage < count;
        const hasPrev = (page - 1) * itemsPerPage > 0;
        return new PaginatedResult<UserDto>(
            entities.map(item => new UserDto(
                item.id,
                item.email,
                item.firstName,
                item.lastName,
                item.lastName,
                item.city),
            ),
            count,
            hasNext,
            hasPrev);
    }

    async create(user: AddUserDto): Promise<UserEntity> {
        const city = await this.cityService.createIfNotExists('ddopa');
        const userModel = UserEntity.create(new UserEntity(user.email,
            user.password,
            user.firstName,
            user.lastName,
            city,
            user.phoneNumber));
        return this.usersRepository.save(userModel);
    }
}
