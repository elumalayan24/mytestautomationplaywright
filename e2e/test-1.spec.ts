import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
await page.goto('https://www.worldfirst.com/my/');
await page.getByRole('link', { name: 'Sign Up for Free' }).click();
await page.getByRole('button', { name: 'Continue' }).click();
await page.getByRole('button', { name: 'Confirm' }).click();
await page.getByRole('button', { name: 'Confirm' }).click();
});