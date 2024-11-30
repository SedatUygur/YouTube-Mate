// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Session } from '@auth/core/types';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: import('$lib/i18n/i18n-types.ts').Locales;
			session: Session | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
