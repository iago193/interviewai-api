import { Module } from '@nestjs/common';
import { UserModule } from '../src/users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
