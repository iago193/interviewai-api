import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './authDto';
import { Public } from '../public/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}
  @Public()
  @Post()
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
