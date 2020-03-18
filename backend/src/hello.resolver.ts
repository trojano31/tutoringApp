import {Query, Resolver} from '@nestjs/graphql';

@Resolver()
export class Hello {

    @Query(() => String)
    async Hello() {
        return 'hello';
    }
}
