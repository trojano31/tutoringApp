import { Module } from '@nestjs/common';
import { AdvertResolver } from './advert.resolver';
import { AdvertService } from './advert.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AdvertEntity} from './entity/advert.entity';
import {SubjectModule} from '../subject/subject.module';
import {UserModule} from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertEntity]), SubjectModule, UserModule],
  providers: [AdvertService, AdvertResolver],
  exports: [AdvertService],
})
export class AdvertModule {}
