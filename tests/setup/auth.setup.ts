import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('./'); // baseURL already includes /en

  await page.fill('input[name="username"]', process.env.DP_USERNAME ?? 'qadataautotest');
  await page.fill('input[name="password"]', process.env.DP_PASSWORD ?? 'Autotest@123');
  await page.click('button[type="submit"]');

  // Wait for a landing page banner icon
  await expect(page.locator("//a[contains(@class,'relative tap-highlight-transparent')]")).toBeVisible({ timeout: 15_000 });

  await page.context().storageState({ path: 'playwright/.auth/state.json' });
});
