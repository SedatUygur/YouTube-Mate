/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { PrismaClient, User, UserSettings } from '@prisma/client';
import type { Adapter } from '@auth/core/adapters';

type AnnotatedUser = User & { settings: UserSettings | null; username: string | null };

async function getAnnotatedUser(
	client: PrismaClient,
	user: User | null
): Promise<AnnotatedUser | null> {
	if (!user) return null;
	const account = await client.account.findFirst({
		where: {
			userId: user.id,
			provider: 'google',
		},
	});

	const userWithUsername = user as AnnotatedUser;
	if (account) {
		userWithUsername.username = account.username;
	}

	return userWithUsername;
}

// TODO: make sure every user query that requires it is updated...
// TODO: fix ts-ignores
export default function CustomPrismaAdapter(client: PrismaClient): Adapter {
	return {
		...PrismaAdapter(client),
		// @ts-ignore
		createUser({ id, ...data }) {
			return client.user.create({ data });
		},
		// @ts-ignore
		async getUser(id: string) {
			const user = await client.user.findUnique({
				where: { id },
				include: { settings: true },
			});
			return getAnnotatedUser(client, user);
		},
		// @ts-ignore
		async getUserByEmail(email) {
			const user = await client.user.findUnique({
				where: { email },
				include: { settings: true },
			});
			return getAnnotatedUser(client, user);
		},
		// @ts-ignore
		async getUserByAccount(provider) {
			const account = await client.account.findUnique({
				where: { provider_providerAccountId: provider },
				include: {
					user: {
						include: {
							settings: true,
						},
					},
				},
			});
			const userWithUsername = account?.user as AnnotatedUser;
			if (account && userWithUsername) {
				userWithUsername.username = account.username;
			}
			return userWithUsername ?? null;
		},
		// @ts-ignore
		async getSessionAndUser(sessionToken) {
			const userAndSession = await client.session.findUnique({
				where: { sessionToken },
				include: {
					user: {
						include: {
							settings: true,
						},
					},
				},
			});

			if (!userAndSession) return null;

			const { user, ...session } = userAndSession;
			const annotatedUser = await getAnnotatedUser(client, user);
			if (!annotatedUser) return null;
			return { user: annotatedUser, session };
		},
	};
}
