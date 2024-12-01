import type { PageServerLoad } from './$types';
import { prisma } from '../lib/config/prisma.ts';
import type { List } from '@prisma/client';

export const load: PageServerLoad = async (events) => {
	let account;
	let lists: List[] = [];
	const session = await events.locals.auth();
	const locale = events.locals.locale;

	if (session?.user) {
		lists = await prisma.list.findMany({
			where: {
				userId: session.user.id,
			},
		});
		account = await prisma.account.findFirst({
			where: {
				userId: session.user.id,
			},
		});
	}
	return {
		account,
		session,
		locale,
		lists,
	};
};
