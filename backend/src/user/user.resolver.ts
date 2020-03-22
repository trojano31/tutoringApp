import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { forwardRef, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

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
  async getUser(obj, args) {
    const { id } = args;
    return await User.findByIdOrThrow(id);
  }

  @Mutation('createUser')
  async create(@Args('user') user): Promise<User> {
    return this.userService.create({ ...user });
  }
}
