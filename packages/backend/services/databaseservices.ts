import { PrismaClient } from "@prisma/client";

export const DBService = () => {
  const prisma = new PrismaClient();
  return {
    getUser: async (id: string) => {
      const user = await prisma.user.findUnique({
        where: { id },
        include: { likes: true },
      });
      return user;
    },
    createUser: async (id: string, name: string) => {
      const user = await prisma.user.create({ data: { id, name } });
      return user;
    },
  };
};
