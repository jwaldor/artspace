import { PrismaClient } from "@prisma/client";

export const DBService = () => {
  const prisma = new PrismaClient();
  return {
    userExists: async (id: string) => {
      const user = await prisma.user.findUnique({ where: { id } });
      return user !== null;
    },
    createUser: async (id: string) => {
      const user = await prisma.user.create({ data: { id } });
      return user;
    },
  };
};
