import { expect, test } from '@playwright/test';

test('login button redirects to google', async ({ page }) => {
	await page.goto('/');
	await page.getByText("YouTube'a giriş yap").click();
	await page.waitForURL('**/accounts.google.com/**');
	expect(page.url()).toContain('https://accounts.google.com/');
});
