import { Controller, Get, Param } from '@nestjs/common';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  @Get('/:id')
  async getOneById (@Param('id') id: string) {
    return await User.findByIdOrThrow(id);
  } 
}
