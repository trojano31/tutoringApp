import { BaseEntity, PrimaryGeneratedColumn, ObjectType, FindManyOptions, getRepository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

export class BaseModel extends BaseEntity {
 @PrimaryGeneratedColumn()
 id: string;

 static async findOneOrThrow <T extends BaseModel>(this: ObjectType<T>, options: FindManyOptions<T>) {
   const one = await getRepository(this).findOne(options);
   if (one) {
     throw new BadRequestException('Item not found')
   }
   return one;
 }
}
