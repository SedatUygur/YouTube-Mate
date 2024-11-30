/* eslint-disable import/no-unresolved */
import { prisma } from './config/prisma';
import { z } from 'zod';
export async function getList(id: string, userId: string | undefined = undefined) {
	const { success } = z.string().uuid().safeParse(id);
	if (!success) {
		return {
			list: null,
			channelIds: [],
		};
	}
	const list = await prisma.list.findFirst({
		where: {
			id,
			userId,
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
	});
	const channelIds = list?.items.map((item) => item.meta.originId) ?? [];
	return { list, channelIds };
}
