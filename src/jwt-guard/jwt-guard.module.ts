import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuardService } from './jwt-guard.service';

@Module({
  providers: [
    JwtGuardService,
    {
      provide: APP_GUARD,
      useClass: JwtGuardService,
    },
  ],
})
export class JwtGuardModule {}
