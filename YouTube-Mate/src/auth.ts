import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma.ts';
/*import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

if (!GOOGLE_CLIENT_ID) {
	throw new Error('Missing GOOGLE_CLIENT_ID in .env');
}
if (!GOOGLE_CLIENT_SECRET) {
	throw new Error('Missing GOOGLE_CLIENT_SECRET in .env');
}*/

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [Google],
});
