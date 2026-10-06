import { expect, Locator, Page } from '@playwright/test';

export default class ExploreViewTabsPage {
  // Stores the browser page used by this page object.
  constructor(private readonly page: Page) {}

  private readonly overviewTab = this.page.locator(
    'button[id$="-tab-substation-overview"]'
  );

  private readonly rightChevron = this.page
    .locator('button[type="button"]')
    .nth(34);

  // Resolves a tab label to its page locator.
  private tab(tabName: string): Locator {
    const tabSuffix: Record<string, string> = {
      'Substation Overview': 'substation-overview',
      Electrical: 'electrical',
      'Power Quality': 'power-quality',
      'Fault Overview': 'fault-overview',
      Events: 'events',
      'Event Trending': 'event-trending',
      Environmental: 'environmental',
      Instruments: 'instruments',
      'Load Duration': 'load-duration',
      'Neutral Anomaly': 'neutral-anomaly',
      'Battery Management': 'battery-management',
    };

    const suffix = tabSuffix[tabName];

    if (!suffix) {
      throw new Error(`Unsupported tab: ${tabName}`);
    }

    return this.page.locator(`button[id$="-tab-${suffix}"]`).first();
  }

  // Verifies the Explore tab bar is visible.
  async assertExploreViewDisplayed(): Promise<void> {
    await expect(this.overviewTab).toBeVisible({ timeout: 30_000 });
  }

  // Selects a tab, revealing hidden tabs through the overflow control if needed.
  async selectTab(tabName: string): Promise<void> {
    const tab = this.tab(tabName);

    for (let attempt = 0; attempt < 10; attempt++) {
      if (await tab.isVisible().catch(() => false)) {
        await this.activateTab(tab);
        return;
      }

      if (!(await this.rightChevron.isVisible().catch(() => false))) {
        break;
      }

      await this.rightChevron.click();
      await this.page.waitForTimeout(300);
    }

    await expect(tab).toBeVisible({ timeout: 5_000 });
    await this.activateTab(tab);
  }

  // Activates a tab and waits for its selected state.
  private async activateTab(tab: Locator): Promise<void> {
    await tab.click();
    if ((await tab.getAttribute('aria-selected')) !== 'true') {
      await tab.press('Enter');
    }
    await expect(tab).toHaveAttribute('aria-selected', 'true', { timeout: 10_000 });
  }

  // Verifies the requested Explore tab is selected.
  async assertTabSelected(tabName: string): Promise<void> {
    await expect(this.tab(tabName)).toHaveAttribute(
      'aria-selected',
      'true'
    );
  }

  // Verifies navigation reached the route associated with the requested view.
  async assertExpectedView(expectedView: string): Promise<void> {
    const slug = expectedView
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    await expect(this.page).toHaveURL(
      new RegExp(`[\\/]${slug}(?:[\\/?#]|$)`, 'i')
    );
  }

  // Captures a full-page screenshot for the selected tab.
  async captureSelectedTabScreenshot(tabName: string): Promise<void> {
    const fileName = tabName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');

    await this.page.screenshot({
      path: `test-results/selected-tab-${fileName}.png`,
      fullPage: true,
    });
  }
}