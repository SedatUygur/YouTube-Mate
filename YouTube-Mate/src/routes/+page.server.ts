import type { PageServerLoad } from './$types';
import { prisma } from '../lib/config/prisma.ts';
import type { List } from '@prisma/client';

export const load: PageServerLoad = async (events) => {
	let lists: List[] = [];
	const session = await events.locals.auth();
	const locale = events.locals.locale;

	if (session?.user) {
		lists = await prisma.list.findMany({
			where: {
				userId: session.user.id,
			},
		});
	}
	return {
		session,
		locale,
		lists,
	};
};
