import {forwardRef, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {AdvertEntity} from './entity/advert.entity';
import {getRepository, Repository} from 'typeorm';
import {AddAdvertDto} from './dto/addAdvertDto';
import {SubjectService} from '../subject/subject.service';
import {UserService} from '../user/user.service';
import {AdvertDto} from './dto/advertDto';
import {User} from '../user/entity/user.entity';
import {SubjectDto} from '../subject/subjectDto';
import {PaginatedResult} from '../common/PaginatedResult';
import {AdvertFilter} from './dto/advertFilter';

@Injectable()
export class AdvertService {
    constructor(
        @InjectRepository(AdvertEntity)
        private readonly advertRepository: Repository<AdvertEntity>,
        @Inject(forwardRef(() => SubjectService))
        private readonly subjectService: SubjectService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService) {
    }

    async findById(id: string): Promise<AdvertDto | undefined> {
        const entity = await this.advertRepository.findOne(id);
        return new AdvertDto(entity.id,
            entity.place,
            entity.level,
            entity.dateFrom,
            entity.dateTo,
            entity.time,
            entity.price,
            new SubjectDto(entity.subject.id, entity.subject.name),
            new User(entity.teacher?.email,
                entity.teacher?.hashedPwd,
                entity.teacher?.firstName,
                entity.teacher?.lastName,
                entity.teacher?.address,
                entity.teacher?.phone),
        );
    }

    async find(advertFilter: AdvertFilter): Promise<PaginatedResult<AdvertDto> | undefined> {

        const page = advertFilter.page > 0 ? advertFilter.page : 1;
        const priceFrom = advertFilter.priceFrom != null ? advertFilter.priceFrom : 0;

        let queryBuilder = await getRepository(AdvertEntity)
            .createQueryBuilder('advert')
            .where('advert.dateTo >= now() and advert.dateFrom <= now() and advert.isDeleted = false')
            .andWhere('advert.subjectId = :subjectId', {subjectId: advertFilter.subjectId})
            .leftJoinAndSelect('advert.teacher', 'teacher')
            .leftJoinAndSelect('advert.subject', 'subject');

        if (advertFilter.city != null) {
            queryBuilder = await queryBuilder.andWhere('');
        }

        if (advertFilter.place != null) {
            queryBuilder.andWhere('advert.place = :place', {place: advertFilter.place});
        }

        if (advertFilter.level != null) {
            queryBuilder.andWhere('advert.place = :level', {level: advertFilter.level});
        }

        if (advertFilter.priceTo != null) {
            queryBuilder.andWhere('advert.price between :from and :to', {from: priceFrom, to: advertFilter.priceTo});
        }

        const entities = await queryBuilder
            .skip((page - 1) * advertFilter.itemsPerPage)
            .take(advertFilter.itemsPerPage)
            .getMany();

        const count = await queryBuilder.getCount();
        const hasNext = (page + 1) * advertFilter.itemsPerPage < count;
        const hasPrev = (page - 1) * advertFilter.itemsPerPage > 0;

        return new PaginatedResult<AdvertDto>(entities.map(x =>
                new AdvertDto(x.id,
                    x.place,
                    x.level,
                    x.dateFrom,
                    x.dateTo,
                    x.time,
                    x.price,
                    new SubjectDto(x.subject.id, x.subject.name),
                    new User(x.teacher?.email,
                        x.teacher?.hashedPwd,
                        x.teacher?.firstName,
                        x.teacher?.lastName,
                        x.teacher?.address,
                        x.teacher?.phone),
                ),
            ),
            count,
            hasNext,
            hasPrev);
    }

    async addAdvert(advert: AddAdvertDto): Promise<AdvertDto | undefined> {
        const entity = AdvertEntity.create(new AdvertEntity(
            advert.dateFrom,
            advert.dateTo,
            advert.place,
            advert.level,
            advert.price,
            advert.time,
            advert.teacherId,
            advert.subjectId));

        const created = await this.advertRepository.save(entity);
        const subject = await this.subjectService.findById(created.subjectId);
        const teacher = await this.userService.findById(created.teacherId);

        return new AdvertDto(
            created.id,
            created.place,
            advert.level,
            advert.dateFrom,
            advert.dateTo,
            created.time,
            created.price,
            subject,
            teacher);
    }

    async deleteAdvert(id: string, userId: string): Promise<boolean> {
        const entity = await this.advertRepository.findOne(id);
        if (entity != null) {
            if (entity.teacherId !== userId) {
                throw new UnauthorizedException();
            }
            entity.isDeleted = true;
            await this.advertRepository.save(entity);
            return true;
        }
        return false;
    }
}
