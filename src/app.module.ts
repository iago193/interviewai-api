import { Module } from '@nestjs/common';
import { UserModule } from '../src/users/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [UserModule, AuthModule, JwtModule],
})
export class AppModule {}
