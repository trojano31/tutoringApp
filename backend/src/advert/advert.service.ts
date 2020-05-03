import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {AdvertEntity} from './entity/advert.entity';
import {Repository} from 'typeorm';
import {AddAdvertDto} from './dto/addAdvertDto';
import {SubjectService} from '../subject/subject.service';
import {UserService} from '../user/user.service';
import {AdvertDto} from './dto/advertDto';

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
}
