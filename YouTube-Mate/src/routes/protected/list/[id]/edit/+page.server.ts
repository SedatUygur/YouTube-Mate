/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/no-unresolved */
import { ListItemType, Visibility } from '@prisma/client';
import { error as httpError, fail } from '@sveltejs/kit';
import { LL, setLocale } from '$lib/i18n/i18n-svelte';
import { get } from 'svelte/store';
import * as YouTubeAPI from '$lib/YouTubeAPI';
import { prisma } from '$lib/config/prisma';
import { getList } from '$/lib/queries';
import { createListSchema } from '$/lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params, locals }) {
	const $LL = get(LL);
	const { list, channelIds } = await getList({
		id: params.id,
		userId: locals.session?.user?.id,
	});
	setLocale(locals.locale);
	if (!list) {
		throw httpError(404, $LL.errors.notFound());
	}
	const schema = createListSchema($LL);
	const form = await superValidate(
		{
			id: list.id,
			title: list.title,
			slug: list.slug,
			description: list.description ?? '',
			visibility: list.visibility,
			channelIds,
		},
		zod(schema)
	);
	return {
		form,
		list,
		visibility: Visibility,
		visibilities: Object.values(Visibility) as Visibility[],
	};
}

export const actions = {
	update: async (event) => {
		setLocale(event.locals.locale);
		//const session = await event.locals.auth();
		const schema = createListSchema(get(LL));
		const form = await superValidate(event.request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const { id: listId, title, slug, description, visibility, channelIds } = form.data;
			if (!listId) {
				throw new Error('Missing list id');
			}
			const result = await prisma.list.updateMany({
				where: {
					id: listId,
					userId: event.locals.session?.user?.id,
				},
				data: {
					title,
					slug,
					description,
					visibility,
				},
			});

			if (result.count === 0) {
				return fail(404, { error: 'List not found.' });
			}

			await prisma.listItem.deleteMany({
				where: {
					listId,
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
							listId,
							listItemMetaId: existing.id,
							name: existing.name,
						},
					});
					return existing;
				})
			);
			return {
				form,
				success: true,
				slug,
				username: event.locals.session?.user?.username,
			};
		} catch (e) {
			const error = e as Error;
			const { message } = error;
			return fail(400, { error: message });
		}
	},
	// TODO: share this function with edit / create
	search: async (event: { request: { formData: () => any } }) => {
		const formData = event.request.formData();
		const q = (formData.get('search') || '').toString();
		const results = await YouTubeAPI.searchChannels(q);
		return { results };
	},
};
