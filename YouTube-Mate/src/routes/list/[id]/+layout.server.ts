/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable import/no-unresolved */
import { LL, setLocale } from '$/lib/i18n/i18n-svelte';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import * as YouTubeAPI from '$lib/YouTubeAPI';
import { getList } from '$/lib/queries';

export async function load({ params, locals }) {
	try {
		// TODO: handle visibility
		const { list, channelIds } = await getList(params.id);
		if (list) {
			return {
				list,
				streamed: {
					videos: YouTubeAPI.getVideos(channelIds),
				},
			};
		}
	} catch (e: unknown) {
		if (typeof e === 'string') {
			e.toUpperCase(); // works, `e` narrowed to string
		} else if (e instanceof Error) {
			console.error(e.message); // works, `e` narrowed to Error
		}
	}
	setLocale(locals.locale);
	const $LL = get(LL);
	error(404, $LL.errors.notFound());
}
