import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  create(body) {
    console.log(body);
  }
}
