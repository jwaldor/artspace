import { PrismaClient } from "@prisma/client";

export const DBService = () => {
  const prisma = new PrismaClient();
  return {
    getUser: async (id: string) => {
      const user = await prisma.user.findUnique({ where: { id } });
      return user;
    },
    createUser: async (id: string) => {
      const user = await prisma.user.create({ data: { id } });
      return user;
    },
  };
};
