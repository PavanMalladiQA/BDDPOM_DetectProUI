import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });

  const username = page.locator('input[name="username"], input[name="email"], input[placeholder*="username" i]');
  const password = page.locator('input[name="password"], input[type="password"]');
  const loginButton = page.getByRole('button', { name: /sign in|log in|login/i });
  const landingMarker = page.locator("a[class*='tap-highlight-transparent'], [data-testid='app-logo'], header a");

  await expect(username.first()).toBeVisible({ timeout: 30_000 });
  await username.first().fill(process.env.DP_USERNAME ?? 'qadataautotest');
  await password.first().fill(process.env.DP_PASSWORD ?? 'Autotest@123');
  await loginButton.click();

  await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {});
  await expect(page).toHaveURL(/detectpro|sub360test|en/i, { timeout: 30_000 });
  await expect(landingMarker.first()).toBeVisible({ timeout: 60_000 });

  await page.context().storageState({ path: 'playwright/.auth/state.json' });
});

