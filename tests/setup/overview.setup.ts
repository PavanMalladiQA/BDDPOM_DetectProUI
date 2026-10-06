import { test as setup, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import HomePage from '../smoketest/pages/homePage';
import testdata from '../smoketest/hooks/testdata.json';

setup('open substation overview', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  const homePage = new HomePage(page);
  await homePage.assertOnHomeSubCounters();
  await homePage.clickExploreOnSubstation(testdata.substation_name);

  await expect(page).toHaveURL(/substation-overview/i, { timeout: 60_000 });

  await writeFile(
    'playwright/.auth/overview-url.json',
    JSON.stringify({ url: page.url() }, null, 2),
    'utf8'
  );
});
