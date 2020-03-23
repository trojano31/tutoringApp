import { Args, Context, GraphQLExecutionContext, Mutation, Resolver } from '@nestjs/graphql';
import { forwardRef, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
  }

  @Mutation('login')
  async login(
    @Args('loginInput') loginInput,
    @Context() context: GraphQLExecutionContext,
  ) {
    const user = await this.authService.validateUser(loginInput.email, loginInput.password);

    if (!user) {
      throw Error('Email or password incorrect');
    }

    const token = await this.authService.login(user);
    // @ts-ignore
    context.res.cookie('token', token, { httpOnly: true });
    return user;
  }

}
