import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// hello


export default async () => {
    await prisma.$disconnect();
};
