// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: import('$lib/i18n/i18n-types.ts').Locales;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
