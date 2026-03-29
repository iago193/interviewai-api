import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from './userType';
import { UserSchema } from 'src/schema/userSchema';
import { UserValidator } from 'src/validators/userValidator';
import { hashBcrypt } from 'src/utils/bcrypt';
import { UserEditSchema } from 'src/schema/userEditSchema';
import { UserEditValidator } from 'src/validators/UserEditValidator';

@Injectable()
export class UserService {
  constructor(readonly prisma: PrismaService) {}
  async index(id) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      cpf: user.cpf,
    };
  }
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

  async edit(id: string, body: UserType) {
    const idExisting = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!idExisting) throw new NotFoundException('ID Não encontrado');

    const validate = UserEditSchema.safeParse(body);

    if (!validate.success) {
      throw new BadRequestException(validate.error.issues);
    }

    const userValidate = UserEditValidator.validate(validate.data as UserType);

    if (userValidate.errors.length > 0) {
      throw new BadRequestException(userValidate.errors);
    }

    const userEdited = await this.prisma.user.update({
      where: { id: Number(id) },
      data: validate.data,
    });

    return userEdited;
  }
}
