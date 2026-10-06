import 'dotenv/config';
import { test as setup, expect } from '@playwright/test';

const loginUsername = process.env.LOGIN_USERNAME;
const loginPassword = process.env.LOGIN_PASSWORD;

setup('authenticate', async ({ page }) => {
  if (!loginUsername || !loginPassword) {
    throw new Error('LOGIN_USERNAME and LOGIN_PASSWORD must be set (see .env.example)');
  }

  await page.goto('./', { waitUntil: 'domcontentloaded' });

  const username = page.locator('input[name="username"], input[name="email"], input[placeholder*="username" i]');
  const password = page.locator('input[name="password"], input[type="password"]');
  const loginButton = page.getByRole('button', { name: /sign in|log in|login/i });
  const landingMarker = page.locator("a[class*='tap-highlight-transparent'], [data-testid='app-logo'], header a");

  await expect(username.first()).toBeVisible({ timeout: 30_000 });
  await username.first().fill(loginUsername);
  await password.first().fill(loginPassword);
  await loginButton.click();

  await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {});
  await expect(page).toHaveURL(/detectpro|sub360test|en/i, { timeout: 30_000 });
  await expect(landingMarker.first()).toBeVisible({ timeout: 60_000 });

  await page.context().storageState({ path: 'playwright/.auth/state.json' });
});

