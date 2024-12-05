/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable import/no-unresolved */
import { ListItemType, Visibility } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { LL, setLocale } from '$lib/i18n/i18n-svelte';
import { get } from 'svelte/store';
//import type { Actions } from '../../$types';
import { prisma } from '$lib/config/prisma.ts';
import * as YouTubeAPI from '$lib/YouTubeAPI';
import { createListSchema } from '$/lib/schemas';
import { superValidate } from 'sveltekit-superforms/server';
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

export const actions = {
	create: async (event) => {
		setLocale(event.locals.locale);
		const schema = createListSchema(get(LL));
		const form = await superValidate(event.request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const { title, slug, description, visibility, channelIds } = form.data;
			const { user } = event.locals.session!;
			const insertedList = await prisma.list.create({
				data: {
					slug,
					title,
					description,
					visibility,
					userId: user!.id!,
				},
			});

			// TODO: fail gracefully... use transactions... refactor this
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
							listId: insertedList.id,
							listItemMetaId: existing.id,
							name: existing.name,
						},
					});
					return existing;
				})
			);
			console.log(
				'protected create account pageserver actions create username is ',
				event.locals.session?.user?.username
			);
			return {
				form,
				success: true,
				slug: insertedList.slug,
				username: event.locals.session?.user?.username,
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
