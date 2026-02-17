// tests/setup/customer.setup.ts
import { test as setup, expect } from '@playwright/test';

setup('select customer', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });

  // Open the customer combobox (your selector is fine)
  const customerInput = page.locator("(//input[@aria-label='Customer'])[1]");
  await customerInput.click();

  // Type to filter suggestions
  await customerInput.fill('EA Technology Manufacturer');

  // Click the option from the suggestions list (NOT a span)
  const option = page.getByRole('option', { name: 'EA Technology Manufacturer' });
  await expect(option).toBeVisible({ timeout: 15_000 });
  await option.click();

  // Assert Home marker
  const viewOptions = page.getByRole('tablist', { name: /view options/i });
  await expect(viewOptions).toBeVisible({ timeout: 15_000 });
  await expect(viewOptions.getByRole('tab', { name: 'Map', exact: true })).toBeVisible({ timeout: 15_000 });

  // Save “customer-selected” state
  await page.context().storageState({ path: 'playwright/.auth/customer.json' });
});
