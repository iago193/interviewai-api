import { PrismaService } from 'src/prisma/prisma.service';

export const validateId = async (id: number): Promise<boolean> => {
  const prisma = new PrismaService();
  const idExisting = await prisma.user.findUnique({
    where: { id },
  });
  return idExisting !== null;
};
