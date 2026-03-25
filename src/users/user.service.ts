import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from './userType';
import { UserSchema } from 'src/schema/userSchema';
import { UserValidator } from 'src/validators/userValidator';
import { hashBcrypt } from 'src/utils/bcrypt';

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

    const { password, ...rest } = userValidate.data!;
    const hashPassword = await hashBcrypt(password);

    const user = await this.prisma.user.create({
      data: {
        firstname: rest.firstname,
        lastname: rest.lastname,
        email: rest.email,
        cpf: rest.cpf,
        loggedinemail: rest.loggedinemail,
        password_hash: hashPassword,
      },
    });
    return (({ firstname, lastname, cpf }) => ({ firstname, lastname, cpf }))(
      user,
    );
  }
}
