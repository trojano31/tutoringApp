import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {forwardRef, Inject} from '@nestjs/common';
import {SubjectService} from './subject.service';
import {SubjectDto} from './subjectDto';
import {PaginatedResult} from '../common/PaginatedResult';

@Resolver('Subject')
export class SubjectResolver {
    constructor(@Inject(forwardRef(() => SubjectService)) private readonly subjectService: SubjectService) {
    }

    @Query('subjects')
    async getSubjects(@Args('paginationInput') paginationInput): Promise<PaginatedResult<SubjectDto>> {
        return await this.subjectService.findAllPaginated(paginationInput.page, paginationInput.itemsPerPage, paginationInput.filter);
    }

    @Query('subject')
    async getSubject(@Args('id') id): Promise<SubjectDto> {
        return await this.subjectService.findById(id);
    }

    @Mutation('addSubject')
    async addOrUpdateSubject(@Args('name') name): Promise<SubjectDto> {
        return await this.subjectService.addIfNotExists(name);
    }
}
