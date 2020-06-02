import {Module} from '@nestjs/common';
import {MinioClientController} from './minio-client.controller';
import {NestMinioModule} from 'nestjs-minio';
import {MinioClientService} from './minio-client.service';
import {PassportModule} from '@nestjs/passport';

@Module({
    controllers: [MinioClientController],
    providers: [MinioClientService],
    imports: [
        NestMinioModule.register({
            endPoint: 'localhost',
            port: 9000,
            useSSL: false,
            accessKey: '4D9185C8CC9649B9',
            secretKey: '162865EFD4DC4D1DB4F6A3D05559F54C',
        }),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
    ],
})
export class MinioClientModule {
}
