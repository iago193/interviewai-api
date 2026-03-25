// user/dto/create-user.dto.ts
import { z } from 'zod';

export const UserSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  password: z.string(),
  loggedinemail: z.boolean(),
});

export type UserType = z.infer<typeof UserSchema>;
