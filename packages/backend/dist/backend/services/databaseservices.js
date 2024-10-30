import { PrismaClient } from "@prisma/client";
export const DBService = () => {
    const prisma = new PrismaClient();
    return {
        getUser: async (id) => {
            const user = await prisma.user.findUnique({
                where: { id },
                include: { likes: true },
            });
            return user;
        },
        createUser: async (id, name) => {
            const user = await prisma.user.create({ data: { id, name } });
            return user;
        },
    };
};
