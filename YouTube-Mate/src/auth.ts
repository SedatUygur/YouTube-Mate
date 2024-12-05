/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-unresolved */
import { SvelteKitAuth } from '@auth/sveltekit';
//import type { DefaultSession } from '@auth/core/types';
import Google from '@auth/sveltekit/providers/google';
import PrismaAdapter from './lib/config/PrismaAdapter.ts';
import { prisma, userSettings } from './lib/config/prisma.ts';
import type { $Enums } from '@prisma/client';
import { updateAccountUsername } from '$lib/youtube.ts';

declare module '@auth/core/types' {
	/*interface Session {
		user: {
			id: string;
			settings: typeof userSettings;
		} & DefaultSession['user'];
	}*/

	interface User {
		settings: typeof userSettings;
		username: string;
	}
}

declare module '@auth/sveltekit' {
	interface SvelteKitAuthConfig {
		adapter: PrismaAdapter;
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	const authOptions = {
		adapter: PrismaAdapter(prisma),
		providers: [
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			Google({
				id: 'google',
				name: 'Google',
				// for production
				authorization: {
					params: {
						scope:
							'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/youtube.readonly',
					},
				},
			}),
		],
		trustHost: true,
		callbacks: {
			session: ({ session, user }) => {
				session.user = {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					settings: user.settings,
					username: user.username,
				};
				event.locals.session = session;
				return session;
			},
		},
		events: {
			async createUser(message: {
				user: {
					settings: {
						id: string;
						onboarded: boolean;
						colorScheme: $Enums.ColorScheme;
						userId: string;
						localeId: string;
					};
					id: any;
				};
			}) {
				if (!message.user.settings) {
					const locale = await prisma.locale.findFirst({
						where: {
							id: event.locals.locale,
						},
					});
					const settings = await prisma.userSettings.create({
						data: {
							localeId: locale?.id ?? 'en-US',
							userId: message.user.id!,
						},
					});
					message.user.settings = settings;
				}
			},
			async signIn(message) {
				if (message.account && message.account.provider === 'google') {
					const username = await updateAccountUsername(message);
					if (event.locals.session?.user) {
						event.locals.session.user.username = username ?? '@Unknown';
					}
				}
			},
		},
	};
	return authOptions;
});
