import type { PageServerLoad } from './$types';
import { prisma } from '../lib/config/prisma.ts';
import type { ListWithItems } from '../lib/config/prisma.list.ts';

export const load: PageServerLoad = async (events) => {
	let account;
	let lists: ListWithItems[] = [];
	const session = await events.locals.auth();
	const locale = events.locals.locale;

	if (session?.user) {
		lists = (await prisma.list.findMany({
			where: {
				userId: session.user.id,
			},
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				items: {
					include: {
						meta: {
							include: {
								youtubeMeta: true,
							},
						},
					},
				},
			},
		})) as unknown as ListWithItems[];
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
