import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GraphQLModule} from '@nestjs/graphql';
import {AuthModule} from './auth/auth.module';
import {join} from 'path';
import {MinioClientModule} from './mino-client/minio-client.module';
import {MulterModule} from '@nestjs/platform-express';

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
        }),
        AuthModule,
        MinioClientModule,
        MulterModule.register({
            dest: './tmp',
        }),
    ],
    providers: [AppService],
})
export class AppModule {
}
