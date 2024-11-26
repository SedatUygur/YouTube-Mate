/* eslint-disable import/no-unresolved */
import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import PrismaAdapter from './PrismaAdapter';
import { prisma, userSettings } from './prisma.ts';

declare module '@auth/sveltekit' {
	interface Session {
		user: {
			id: string;
			settings: typeof userSettings;
		} & DefaultSession['user'];
	}

	interface User {
		settings: typeof userSettings;
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [Google],
	callbacks: {
		session: ({ session, user }) => {
			session.user = {
				id: user.id,
				name: user.name,
				email: user.email,
				image: user.image,
				settings: user.settings,
				emailVerified: new Date(),
			};
			//event.locals.session = session;
			return session;
		},
	},
	events: {
		async createUser(message) {
			/*const locale = await prisma.locale.findFirst({
				where: {
					id: event.locals.locale,
				},
			});*/
			await prisma.userSettings.create({
				data: {
					//localeId: locale?.id ?? 'en-US',
					localeId: 'en-US',
					userId: message.user.id,
				},
			});
		},
	},
});
