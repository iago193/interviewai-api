import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './authDto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}
  @Post()
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
