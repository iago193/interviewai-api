// user/dto/create-user.dto.ts
import { z } from 'zod';

export const UserEditSchema = z
  .object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().email().optional(),
    cpf: z.string().optional(),
    loggedinemail: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'At least one field must be provided for update',
  });

export type UserType = z.infer<typeof UserEditSchema>;
