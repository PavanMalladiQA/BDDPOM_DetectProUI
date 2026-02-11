// pageHooks.ts
import { createBdd } from 'playwright-bdd';
import type { Page } from '@playwright/test';
import { pageFixture } from './pageFixture';

const { Before, After } = createBdd();

type Fixtures = { page: Page };
// NOTE: playwright-bdd requires the first argument to use object destructuring.

// This initializes your page objects for every scenario.
Before(async ({ page }: Fixtures) => {
  pageFixture.init(page);
});

// Optional: reset fixture references between scenarios (helps avoid leaking state)
After(async ({}: Fixtures) => {
  // If you added a reset() method, use it:
  // pageFixture.reset();
});