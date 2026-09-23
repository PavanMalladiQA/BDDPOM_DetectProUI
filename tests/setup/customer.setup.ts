// tests/setup/customer.setup.ts
import { test as setup, expect } from '@playwright/test';

const CUSTOMER_NAME = process.env.DP_CUSTOMER ?? 'EA Technology Manufacturer';

setup('select customer', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });

  // Prefer role-based combobox; fallback to your XPath if needed
  const customerCombo =
    page.getByRole('combobox', { name: /^customer$/i }).first();

  const customerInputFallback = page.locator("(//input[@aria-label='Customer'])[1]");
  const customerInput = (await customerCombo.count()) ? customerCombo : customerInputFallback;

  await expect(customerInput).toBeVisible({ timeout: 30_000 });

  // If customer already selected, don’t re-select (keeps this setup fast & stable)
  const currentValue = await customerInput.inputValue().catch(() => '');
  if (currentValue?.trim()?.toLowerCase() !== CUSTOMER_NAME.toLowerCase()) {
    await customerInput.click();
    await customerInput.fill(CUSTOMER_NAME);

    // Option: try ARIA option first (best practice)
    const optionByRole = page.getByRole('option', { name: new RegExp(`^${escapeRegExp(CUSTOMER_NAME)}$`, 'i') }).first();

    if (await optionByRole.count()) {
      await expect(optionByRole).toBeVisible({ timeout: 30_000 });
      await optionByRole.click();
    } else {
      // Fallback: click by visible text if the component doesn’t expose role=option
      const optionByText = page.getByText(CUSTOMER_NAME, { exact: true }).first();
      await expect(optionByText).toBeVisible({ timeout: 30_000 });
      await optionByText.click();
    }

    // Confirm customer is applied
    await expect(customerInput).toHaveValue(new RegExp(escapeRegExp(CUSTOMER_NAME), 'i'), { timeout: 30_000 });
  }

  // Assert Home marker (View options tabs exist)
  const viewOptions = page.getByRole('tablist', { name: /view options/i });
  await expect(viewOptions).toBeVisible({ timeout: 30_000 });
  await expect(viewOptions.getByRole('tab', { name: 'Map', exact: true })).toBeVisible({ timeout: 30_000 });

  // Save “customer-selected” state
  await page.context().storageState({ path: 'playwright/.auth/customer.json' });
});

// Utility for safe regex matching
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
