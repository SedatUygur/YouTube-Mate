/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { ListItemType, Visibility } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { LL, setLocale } from '$lib/i18n/i18n-svelte';
import { get } from 'svelte/store';
import { z, ZodError } from 'zod';
import type { Actions } from '../../$types';
import { prisma } from '../../../prisma.ts';
import * as YouTubeAPI from '$lib/YouTubeAPI';

export function load() {
	return {
		visibility: Visibility,
		visibilities: Object.values(Visibility) as Visibility[],
	};
}

export const actions: Actions = {
	create: async (event) => {
		let isSuccess = false;
		let insertedId = '';
		const $LL = get(LL);
		setLocale(event.locals.locale);
		const ListCreateRequestSchema = z.object({
			title: z.string().trim().min(1, $LL.errors.titleRequired()),
			description: z.string().trim().min(1, $LL.errors.descriptionRequired()).optional(),
			visibility: z.nativeEnum(Visibility),
			channelIds: z.array(z.string().trim().min(1)),
		});
		const formData = await event.request.formData();
		const formDataObject = Object.fromEntries(formData) as any;
		const channels = formData.getAll('channelIds');
		formDataObject.channelIds = channels;
		try {
			const { title, description, visibility, channelIds } =
				await ListCreateRequestSchema.parseAsync(formDataObject);
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
				success: isSuccess,
				listId: insertedId,
			};
		} catch (e) {
			const error = e as Error;
			let { message } = error;
			if (error instanceof ZodError) {
				const errorMessages = error.issues.map((issue) => issue.message);
				message = errorMessages.join('\n');
			}
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
