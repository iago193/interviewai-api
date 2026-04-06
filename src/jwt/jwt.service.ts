import crypto from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

interface TokenPayload {
  id: number;
  name: string;
  lastName: string;
}

@Injectable()
export class JwtService {
  private static base64url(obj: object): string {
    return Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  static generateToken({ id, name, lastName }: TokenPayload): string {
    const SECRET = process.env.JWT_SECRET;
    const EXPIRES = process.env.JWT_EXPIRES_IN;

    if (!SECRET || !EXPIRES) {
      throw new Error('JWT_SECRET e JWT_EXPIRES_IN são obrigatórios');
    }

    const header = { alg: 'HS256', typ: 'JWT' };

    const payload = {
      sub: id,
      name: `${name} ${lastName}`,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + parseInt(EXPIRES),
    };

    const headerEncoded = JwtService.base64url(header);
    const payloadEncoded = JwtService.base64url(payload);

    const signature = crypto
      .createHmac('sha256', SECRET)
      .update(`${headerEncoded}.${payloadEncoded}`)
      .digest('base64url');

    return `${headerEncoded}.${payloadEncoded}.${signature}`;
  }

  static verifyToken(token: string): object {
    const SECRET = process.env.JWT_SECRET;

    if (!SECRET) {
      throw new Error('JWT_SECRET não definido');
    }

    const [headerEncoded, payloadEncoded, signature] = token.split('.');

    const expectedSignature = crypto
      .createHmac('sha256', SECRET)
      .update(`${headerEncoded}.${payloadEncoded}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      throw new UnauthorizedException('Token inválido');
    }

    const payload = JSON.parse(
      Buffer.from(payloadEncoded, 'base64url').toString(),
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      throw new UnauthorizedException('Token expirado');
    }

    return payload;
  }
}
