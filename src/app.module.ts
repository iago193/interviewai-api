import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [PrismaModule, EmployeeModule],
  controllers: [AppController, EmployeeController],
  providers: [AppService],
})
export class AppModule {}
