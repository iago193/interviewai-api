import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from './userType';
import { UserSchema } from 'src/schema/userSchema';

@Injectable()
export class UserService {
  constructor(readonly prisma: PrismaService) {}
  async create(body: UserType) {
    const validate = UserSchema.parse(body);
    const user = await this.prisma.user.create({
      data: validate,
    });
    return user;
  }
}
