// user/dto/create-user.dto.ts
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UserSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  loggedinemail: z.boolean(),
});

export class CreateUserDto extends createZodDto(UserSchema) {}
