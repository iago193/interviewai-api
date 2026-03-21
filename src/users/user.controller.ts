import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './userDto';

@Controller('user')
export class UserController {
  constructor(private readonly employeeService: UserService) {}

  @Post()
  createEmployee(@Body() dto: UserDto) {
    return this.employeeService.create(dto);
  }
}
