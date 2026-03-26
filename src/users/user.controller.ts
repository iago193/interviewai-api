import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './userDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  index(@Param('id') id: string) {
    return this.userService.index(parseInt(id));
  }
  @Post()
  createEmployee(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }
}
