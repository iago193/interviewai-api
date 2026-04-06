import { Module } from '@nestjs/common';
import { UserModule } from '../src/users/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { JwtGuardModule } from './jwt-guard/jwt-guard.module';

@Module({
  imports: [UserModule, AuthModule, JwtModule, JwtGuardModule],
})
export class AppModule {}
