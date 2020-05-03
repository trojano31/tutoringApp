import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';
import {ExecutionContext, forwardRef, Inject, UseGuards} from '@nestjs/common';
import {AdvertService} from './advert.service';
import {GqlAuthGuard} from '../auth/graphql-auth.guard';
import {AddAdvertDto} from './dto/addAdvertDto';
import {AdvertDto} from './dto/advertDto';
import {PaginatedResult} from '../common/PaginatedResult';

@Resolver('Advert')
export class AdvertResolver {
    constructor(
        @Inject(forwardRef(() => AdvertService))
        private readonly advertService: AdvertService,
    ) {
    }

    @Mutation('addAdvert')
    @UseGuards(GqlAuthGuard)
    async addAdvert(@Args('advert') advertInput, @Context() context: ExecutionContext): Promise<AdvertDto | undefined> {
        // @ts-ignore
        const ctx = context.req.user;
        const userId = ({...ctx}).id;
        const advert = new AddAdvertDto(advertInput.subjectId,
            userId,
            advertInput.place,
            advertInput.level,
            advertInput.dateFrom,
            advertInput.dateTo,
            advertInput.time,
            advertInput.price);
        return await this.advertService.addAdvert(advert);
    }
}
