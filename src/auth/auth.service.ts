import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './authDto';
import { compareBcryptHash } from 'src/common/utils/bcrypt';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(readonly prisma: PrismaService) {}
  async login(body: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) throw new NotFoundException('Credenciais inválidas');

    const BcryptCompare = await compareBcryptHash(
      body.password,
      user.password_hash,
    );

    if (!BcryptCompare)
      throw new UnauthorizedException('Credenciais inválidas');
    const token = JwtService.generateToken({
      id: user.id,
      name: user.firstname,
      lastName: user.lastname,
    });
    return {
      access_token: token,
    };
  }
}
