import { prisma } from '../../src/lib/config/prisma';
import { seed as localeSeed } from './locales';
import { seed as testSeed } from './tests.ts';

async function main() {
	await localeSeed(prisma);
	if (process.env.NODE_ENV?.toLowerCase() === 'test') {
		await testSeed(prisma);
	}
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
