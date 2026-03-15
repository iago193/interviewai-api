import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/hello')
  getHello(): string {
    return this.employeeService.getHello();
  }
}
