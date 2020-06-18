import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {SubjectEntity} from './entity/subject.entity';
import {getRepository, Repository} from 'typeorm';
import {SubjectDto} from './subjectDto';
import {PaginatedResult} from '../common/PaginatedResult';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(SubjectEntity)
        private readonly subjectsRepository: Repository<SubjectEntity>,
    ) {
    }

    async findById(id: string): Promise<SubjectDto | undefined> {
        const entity = await this.subjectsRepository.findOne(id);
        if (entity == null) {
            throw new Error('Subject was not found');
        }
        return new SubjectDto(entity.id, entity.name);
    }

    async findAll(): Promise<SubjectDto[] | undefined> {
        const subjects = await this.subjectsRepository.find();
        return subjects.map(item => new SubjectDto(item.id, item.name));
    }

    async findAllPaginated(page: number, itemsPerPage: number, filter: string): Promise<PaginatedResult<SubjectDto> | undefined> {

        page = page > 0 ? page : 1;

        let queryBuilder = await getRepository(SubjectEntity)
            .createQueryBuilder('subject');

        if (filter != null) {
            queryBuilder = await queryBuilder
                .where('upper(subject.name) like upper(:name)', {name: `%${filter}%`});
        }
        const entities = await queryBuilder
            .skip((page - 1) * itemsPerPage)
            .take(itemsPerPage)
            .orderBy('name', 'ASC')
            .getMany();

        const count = await queryBuilder.getCount();
        const hasNext = (page + 1) * itemsPerPage < count;
        const hasPrev = (page - 1) * itemsPerPage > 0;
        return new PaginatedResult<SubjectDto>(
            entities.map(item => new SubjectDto(
                item.id,
                item.name),
            ),
            count,
            hasNext,
            hasPrev);
    }

    async addIfNotExists(subjectName: string): Promise<SubjectDto> {
        const entity = await getRepository(SubjectEntity)
            .createQueryBuilder('subject')
            .where('upper(subject.name) like upper(:name)', {name: subjectName})
            .getOne();

        if (entity != null) {
            return new SubjectDto(entity.id, entity.name);
        } else {
            const subjectEntity = SubjectEntity.create(new SubjectEntity(subjectName));
            const subject = await this.subjectsRepository.save(subjectEntity);
            return new SubjectDto(subject.id, subject.name);
        }
    }
}
