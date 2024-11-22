import { detectLocale } from './lib/i18n/i18n-util.ts';
import type { Handle } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

// eslint-disable-next-line @typescript-eslint/unbound-method
export const handle = (async ({ event, resolve }) => {
	// TODO: get lang from cookie / user setting
	const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
	const locale = detectLocale(acceptLanguageHeaderDetector);
	event.locals.locale = locale;
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
}) satisfies Handle;
