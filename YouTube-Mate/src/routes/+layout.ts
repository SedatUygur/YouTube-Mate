import type { LayoutLoad } from './$types';
import { loadLocaleAsync } from '../lib/i18n/i18n-util.async.ts';

export const load = (async (event) => {
	const locale = event.data.locale;
	await loadLocaleAsync(locale);

	return event.data as App.Locals;
}) satisfies LayoutLoad;
