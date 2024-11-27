/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable import/no-unresolved */
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const eventRouteId = event.route.id?.toString();
	const session = await event.locals.auth();
	const locale = event.locals.locale;
	if (
		session?.user &&
		!session.user.settings.onboarded &&
		eventRouteId !== '/protected/onboarding'
	) {
		throw redirect(302, '/onboarding');
	}
	if (
		session?.user.settings &&
		session.user.settings.onboarded &&
		eventRouteId === '/protected/onboarding'
	) {
		throw redirect(302, '/');
	}
	return {
		session,
		locale,
	};
};
