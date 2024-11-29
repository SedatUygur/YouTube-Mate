/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable import/no-unresolved */
import { LL, setLocale } from '$/lib/i18n/i18n-svelte';
import { prisma } from '../../../prisma.ts';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
export async function load({ params, locals }) {
	try {
		// TODO: handle visibility
		const list = await prisma.list.findFirst({
			where: {
				id: params.id,
			},
		});
		if (list) {
			return {
				list,
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
	throw error(404, $LL.errors.notFound());
}
