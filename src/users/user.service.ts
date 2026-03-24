import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from './userType';
import { UserSchema } from 'src/schema/userSchema';
import { UserValidator } from 'src/validators/userValidator';

@Injectable()
export class UserService {
  constructor(readonly prisma: PrismaService) {}
  async create(body: UserType) {
    const validate = UserSchema.safeParse(body);

    if (!validate.success) {
      throw new BadRequestException(validate.error.issues);
    }

    const userValidate = UserValidator.validate(validate.data);

    if (userValidate.errors.length > 0) {
      throw new BadRequestException(userValidate.errors);
    }

    const user = await this.prisma.user.create({
      data: userValidate.data!,
    });
    return user;
  }
}
