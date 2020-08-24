import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {forwardRef, Inject, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {UserEntity} from './entity/user.entity';
import {GqlAuthGuard} from '../auth/graphql-auth.guard';
import {PaginatedResult} from '../common/PaginatedResult';
import {CityDto} from './dto/cityDto';
import {CityService} from './city.service';
import {PaginationInput} from '../common/paginationInput';
import {UserDto} from './dto/userDto';

@Resolver('User')
export class UserResolver {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @Inject(forwardRef(() => CityService))
        private readonly cityService: CityService,
    ) {
    }

    @Query('users')
    async getUsers(@Args('paginationInput') paginationInput: PaginationInput): Promise<PaginatedResult<UserDto>> {
        return await this.userService.findAllPaginated(paginationInput.page, paginationInput.itemsPerPage, paginationInput.filter);
    }

    @Query('user')
    @UseGuards(GqlAuthGuard)
    async getUser(@Args('id') id) {
        return await this.userService.findById(id);
    }

    @Mutation('createUser')
    async create(@Args('user') user): Promise<UserEntity> {
        return this.userService.create({...user});
    }

    @Query('cities')
    async getCities(@Args('paginationInput') paginationInput: PaginationInput): Promise<PaginatedResult<CityDto>> {
        return await this.cityService.findAllPaginated(paginationInput.page, paginationInput.itemsPerPage, paginationInput.filter);
    }
}
