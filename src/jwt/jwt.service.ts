import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  static generateToken(payload) {
    return {
      payload,
      token: 'wdwdwdwdwdwdwdww',
    };
  }
}
