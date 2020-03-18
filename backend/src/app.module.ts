import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GraphQLModule} from '@nestjs/graphql';
import {HelloModule} from './hello.module';

@Module({
    imports: [
        HelloModule,
        TypeOrmModule.forRoot(),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: true,
        })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
