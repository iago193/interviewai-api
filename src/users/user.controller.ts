import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.edit(parseInt(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}
