import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
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

    @Query('advert')
    async getAdvert(@Args('id') id): Promise<AdvertDto | undefined> {
        return this.advertService.findById(id);
    }

    @Query('adverts')
    async getAdverts(@Args('advertFilter') advertFilter): Promise<PaginatedResult<AdvertDto> | undefined> {
        return this.advertService.find(advertFilter);
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

    @Mutation('deleteAdvert')
    @UseGuards(GqlAuthGuard)
    async deleteAdvert(@Args('id') id, @Context() context: ExecutionContext): Promise<string> {
        // @ts-ignore
        const ctx = context.req.user;
        const userId = ({...ctx}).id;
        const result = await this.advertService.deleteAdvert(id, userId);
        if (result) {
            return 'OK';
        }
        return 'Error';
    }

    @Mutation('updateAdvert')
    @UseGuards(GqlAuthGuard)
    async updateAdvert(@Args('advert') advert, @Context() context: ExecutionContext): Promise<AdvertDto | undefined> {
        // @ts-ignore
        const ctx = context.req.user;
        const userId = ({...ctx}).id;
        return await this.advertService.editAdvert(advert, userId);
    }
}
