import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './employeeDto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  createEmployee(@Body() dto: EmployeeDto) {
    return this.employeeService.create(dto);
  }
}
