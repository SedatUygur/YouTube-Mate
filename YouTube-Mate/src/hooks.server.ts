/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable import/no-unresolved */
import { redirect, type Handle } from '@sveltejs/kit';
import { handle as handleAuth } from './auth.ts';
import { sequence } from '@sveltejs/kit/hooks';
import { detectLocale } from './lib/i18n/i18n-util.ts';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

const handleDetectLocale = (async ({ event, resolve }) => {
	/*if (event.url.pathname.startsWith('/authenticated')) {
		const session = await event.locals.auth();
		if (!session) {
			// Redirect to the signin page
			return new Response('Redirect', { status: 303, headers: { Location: '/signin' } });
		}
	}*/
	const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
	const locale = detectLocale(acceptLanguageHeaderDetector);
	event.locals.locale = locale;
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
}) satisfies Handle;

const handleProtected = (async ({ event, resolve }) => {
	const session = await event.locals.auth();
	if (!session && event.route.id?.includes('protected')) {
		throw redirect(302, '/');
	}
	return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleDetectLocale, handleAuth, handleProtected);
