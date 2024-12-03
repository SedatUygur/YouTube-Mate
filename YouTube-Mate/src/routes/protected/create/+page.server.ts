/* eslint-disable @typescript-eslint/no-base-to-string */

/* eslint-disable import/no-unresolved */
import { ListItemType, Visibility } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { LL, setLocale } from '$lib/i18n/i18n-svelte';
import { get } from 'svelte/store';
import type { Actions } from '../../$types';
import { prisma } from '$lib/config/prisma.ts';
import * as YouTubeAPI from '$lib/YouTubeAPI';
import { createListSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
	const schema = createListSchema(get(LL));
	const form = await superValidate(zod(schema));
	return {
		form,
		visibility: Visibility,
		visibilities: Object.values(Visibility) as Visibility[],
	};
}

export const actions: Actions = {
	create: async (event) => {
		let isSuccess = false;
		let insertedId = '';
		setLocale(event.locals.locale);
		const schema = createListSchema(get(LL));
		const form = await superValidate(event.request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const { title, description, visibility, channelIds } = form.data;
			const session = await event.locals.auth();
			if (session?.user) {
				const user = session.user;
				const insertedList = await prisma.list.create({
					data: {
						title,
						description,
						visibility,
						userId: user.id,
					},
				});
				isSuccess = true;
				insertedId = insertedList.id;
			}

			await Promise.all(
				channelIds.map(async (id) => {
					let existing = await prisma.listItemMeta.findFirst({
						where: {
							originId: id,
						},
					});
					if (!existing) {
						const channel = await YouTubeAPI.getChannel(id);
						if (channel) {
							existing = await prisma.listItemMeta.create({
								data: {
									originId: id,
									name: channel.name,
									type: ListItemType.YouTubeChannel,
									imageUrl: channel.avatarUrl,
									youtubeMeta: {
										create: channel,
									},
								},
							});
						} else {
							throw new Error(`Channel with id: ${id} not found.`);
						}
					}
					await prisma.listItem.create({
						data: {
							listId: insertedId,
							listItemMetaId: existing.id,
							name: existing.name,
						},
					});
					return existing;
				})
			);

			return {
				form,
				success: isSuccess,
				listId: insertedId,
			};
		} catch (e) {
			const error = e as Error;
			const { message } = error;
			return fail(400, { error: message });
		}
	},
	search: async (event) => {
		const formData = await event.request.formData();
		const q = (formData.get('search') ?? '').toString();
		const results = await YouTubeAPI.searchChannels(q);
		return { results };
	},
};
