import { PrismaClient, type UserSettings } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient;
	userSettings: UserSettings;
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const prisma = globalForPrisma.prisma || new PrismaClient();
export const userSettings = globalForPrisma.userSettings;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
globalForPrisma.userSettings = userSettings;
