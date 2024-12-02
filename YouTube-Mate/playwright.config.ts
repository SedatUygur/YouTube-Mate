import { defineConfig } from '@playwright/test';

export default defineConfig({
	use: {
		locale: 'en-US',
	},
	webServer: {
		command: 'dotenv -e .env.test -- npm run preview',
		port: 4173,
	},

	testDir: 'e2e',
});
