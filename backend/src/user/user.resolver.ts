import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {
  }

  @Query('users')
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query('user')
  @UseGuards(GqlAuthGuard)
  async getUser(@Args('id') id) {
    return await User.findByIdOrThrow(id);
  }

  @Mutation('createUser')
  async create(@Args('user') user): Promise<User> {
    return this.userService.create({ ...user });
  }
}
