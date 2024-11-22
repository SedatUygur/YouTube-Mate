import type { LayoutServerLoad } from './$types';
export const load = (({ locals }) => ({
	locale: locals.locale,
})) satisfies LayoutServerLoad;
