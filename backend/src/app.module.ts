import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GraphQLModule} from '@nestjs/graphql';
import {AuthModule} from './auth/auth.module';
import {join} from 'path';
import {MinioClientModule} from './mino-client/minio-client.module';
import {MulterModule} from '@nestjs/platform-express';
import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GraphQLModule} from '@nestjs/graphql';
import {AuthModule} from './auth/auth.module';
import {join} from 'path';
import {SubjectModule} from './subject/subject.module';
import {AdvertModule} from './advert/advert.module';
import {placeTypeResolver} from './advert/placeType';
import {levelTypeResolver} from './advert/advertLevelType';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            installSubscriptionHandlers: true,
            context: ({req, res}) => ({req, res}),
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
            },
            cors: {
                credentials: true,
                origin: true,
            },
        resolvers: {
                Place: placeTypeResolver,
                Level: levelTypeResolver,
            },}),
        AuthModule,SubjectModule,
        AdvertModule,
        MinioClientModule,
        MulterModule.register({
            dest: './tmp',
        }),
    ],
    providers: [AppService],
})
export class AppModule {
}
