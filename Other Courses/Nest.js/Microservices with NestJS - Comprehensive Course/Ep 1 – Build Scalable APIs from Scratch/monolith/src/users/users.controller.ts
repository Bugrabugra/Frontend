import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':id')
  getUser(@Param('id') id: string) {
    return { id, name: 'John Doe' };
  }
}
