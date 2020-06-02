import { BaseEntity, PrimaryGeneratedColumn, ObjectType, FindManyOptions, getRepository, FindConditions } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

export class BaseModel extends BaseEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 static async findOneOrThrow <T extends BaseModel>(this: ObjectType<T>, options: FindManyOptions<T>) {
   const one = await getRepository(this).findOne(options);
   if (!one) {
     throw new BadRequestException('Item not found');
   }
   return one;
 }

 static async findByIdOrThrow <T extends BaseModel>(id: string, where?: FindConditions<T>) {
   return this.findOneOrThrow({ where: { id, ...where } });
 }

 static async deleteByIdOrThrow <T extends BaseModel>(id: string, where?: FindConditions<T> ) {
   const one = await this.findByIdOrThrow(id, where);
   await one.remove();
 }

}
