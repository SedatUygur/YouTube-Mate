import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	const locale = event.locals.locale;
	return {
		session,
		locale,
	};
};
