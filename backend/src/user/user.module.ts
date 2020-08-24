import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import {CityEntity} from './entity/city.entity';
import { CityService } from './city.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CityEntity])],
  providers: [UserService, UserResolver, CityService],
  exports: [UserService, CityService],
})
export class UserModule {}
