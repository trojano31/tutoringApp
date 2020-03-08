import {Module} from '@nestjs/common';
import {Hello} from './hello.resolver';

@Module({
    providers: [Hello],
})
export class HelloModule {
}
