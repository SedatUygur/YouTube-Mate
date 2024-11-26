import { PrismaClient } from '@prisma/client';
import { seed as localeSeed } from './locales';

const prisma = new PrismaClient();
async function main() {
	await localeSeed(prisma);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
