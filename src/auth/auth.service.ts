import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(body) {
    console.log(body);
    return { body };
  }
}
