import { prisma } from '../../src/prisma';
import { seed as localeSeed } from './locales';

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
