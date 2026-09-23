import { expect, Locator, Page } from '@playwright/test';

export default class ExploreView_ElectricalPage {
  constructor(private page: Page) {}

  // ---------------- Locators ----------------
  private Elements = {
    // Core view shell and navigation
    leftNavPanel: "(//div[contains(@class,'flex flex-col')])[2]",
    electricalTab: ":text-is('Electrical')",
    substationOverviewTab: "//button[normalize-space()='Substation Overview']",
    breadcrumbNav: "nav[aria-label*='breadcrumb' i], [role='navigation'][aria-label*='breadcrumb' i]",

    // Chart Filters panel
    chartFiltersHeader: "//h2[normalize-space()='Chart Filters']",
    transformerDropdown: "button:has-text('Select Transformer')",
    instrumentDropdown: "button:has-text('Select Instrument')",
    timePeriodDropdown: "button:has-text('Last 24 hours')",
    assetSection: "//h2[normalize-space()='Asset']",
    dataPointTypeSection: "//h2[normalize-space()='Data Point Type']",
    phaseSection: "//h2[normalize-space()='Phase']",

    // Chart / empty state and controls
    electricalChart: "img[alt*=' - Transformer' i], canvas[class*='am5-layer']",
    noDataState: ":text-is('No data to display')",
    chartExportEllipsis: "svg[fill='none'][height='20']",

    // Asset chips
    assetChipTransformer1: "//button[normalize-space()='Transformer 1']",

    // Footer links
    commissioningLink: "a:has-text('Commissioning')",
    feedbackLink: "a:has-text('Feedback')",
    contactSupportLink: "a:has-text('Contact Support')",

    // Left Navigation badges
    homeBadge: "(//button[@type='button'])[1]",
    chartFiltersBadge: "(//button[@type='button'])[2]",
    appSuiteBadge: "(//button[@type='button'])[3]",
    circuitConditionBadge: "(//button[@type='button'])[4]",
    substationSearchBadge: "(//button[@type='button'])[5]",
    settingsBadge: "(//button[@type='button'])[6]",
    logoutBadge: "(//button[@type='button'])[7]",

  };

  private leftNav() {
    return this.page.locator(this.Elements.leftNavPanel);
  }

  private buttonByName(name: string | RegExp) {
    return this.page.getByRole('button', { name }).first();
  }

  private dropdown(label: string) {
    return this.page.getByRole('button', { name: new RegExp(label, 'i') }).first();
  }

  private async safeClick(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: 30_000 });
    await expect(locator).toBeEnabled({ timeout: 30_000 });
    try {
      await locator.click();
    } catch {
      await locator.click({ force: true });
    }
  }

  private async waitForData() {
    const loading = this.page.getByText('Loading Data', { exact: true });
    if (await loading.count()) {
      await expect(loading).toBeHidden({ timeout: 90_000 });
    }
  }

  async openFromHome() {
    await this.pageFixtureHomeNavigation();
    await this.selectElectricalTab();
    await this.waitForData();
  }

  private async pageFixtureHomeNavigation() {
    await this.page.goto('./', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('tablist', { name: /view options/i })).toBeVisible({ timeout: 30_000 });

    const grid = this.page.getByRole('tab', { name: 'Grid', exact: true });
    if ((await grid.getAttribute('aria-selected')) !== 'true') await this.safeClick(grid);

    const explore = this.page.getByRole('button', { name: /^explore$/i }).first();
    await this.safeClick(explore);
    await expect(this.leftNav()).toBeVisible({ timeout: 60_000 });
  }

  async selectElectricalTab() {
    const tab = this.page.locator(this.Elements.electricalTab).last();
    await expect(tab).toBeVisible({ timeout: 30_000 });
    if ((await tab.getAttribute('aria-selected')) !== 'true') await this.safeClick(tab);
  }

  async assertElectricalTabSelected() {
    const tab = this.page.locator(this.Elements.electricalTab).last();
    await expect(tab).toBeVisible({ timeout: 30_000 });
    const ariaSelected = await tab.getAttribute('aria-selected');
    if (ariaSelected !== null) {
      await expect(tab).toHaveAttribute('aria-selected', 'true');
    } else {
      await expect(tab).toHaveClass(/active|selected/i);
    }
  }

  async assertBreadcrumb() {
    const breadcrumb = this.page.locator('nav[aria-label*="breadcrumb" i], [aria-label*="breadcrumb" i]').first();
    if (await breadcrumb.count()) {
      await expect(breadcrumb).toContainText(/Home/i);
      await expect(breadcrumb).toContainText(/Electrical/i);
      return;
    }
    await expect(this.page.getByText('Home', { exact: true }).first()).toBeVisible();
    await expect(this.page.getByText('Electrical', { exact: true }).last()).toBeVisible();
  }

  async assertChartFiltersVisible() {
    await expect(this.page.locator(this.Elements.chartFiltersHeader)).toBeVisible({ timeout: 30_000 });
  }

  async assertChartTitle() {
    await expect(this.page.getByRole('img', { name: /.+\s-\sTransformer\s.+/i })).toBeVisible({ timeout: 30_000 });
  }

  async assertChartVisible() {
    const chart = this.page.locator(this.Elements.electricalChart).first();
    if (await chart.count()) {
      await expect(chart).toBeVisible({ timeout: 30_000 });
      return;
    }
    await expect(this.page.locator(this.Elements.noDataState).first()).toBeVisible({ timeout: 30_000 });
  }

  async assertExploreTabVisible(tab: string) {
    await expect(this.buttonByName(new RegExp(`^${this.escapeRegExp(tab)}$`, 'i'))).toBeVisible({ timeout: 30_000 });
  }

  async assertExploreTabEnabled(tab: string) {
    await expect(this.buttonByName(new RegExp(`^${this.escapeRegExp(tab)}$`, 'i'))).toBeEnabled({ timeout: 30_000 });
  }

  async assertControlVisible(label: string) {
    await expect(this.dropdown(label)).toBeVisible({ timeout: 30_000 });
  }

  async assertSectionVisible(label: string) {
    await expect(this.page.getByText(label, { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  }

  async openDropdown(label: string) {
    await this.safeClick(this.dropdown(label));
  }

  async assertDropdownOptionsVisible() {
    await expect(this.page.getByRole('listbox').first()).toBeVisible({ timeout: 30_000 });
  }

  async assertDropdownContains(option: string) {
    const matchingOption = this.page.getByRole('listbox').first().getByRole('option').filter({ hasText: option }).first();
    await expect(matchingOption).toBeVisible({ timeout: 30_000 });
  }

  async selectFirstDropdownOption() {
    await this.safeClick(this.page.getByRole('listbox').first().getByRole('option').first());
  }

  async selectAvailableInstrument() {
    const options = this.page.getByRole('listbox').first().getByRole('option');
    await expect(options.first()).toBeVisible({ timeout: 30_000 });
    await options.first().click();
  }

  async assertSelectedDropdown(label: string, value?: string) {
    const dropdown = this.dropdown(label);
    await expect(dropdown).toBeVisible({ timeout: 30_000 });
    if (value) await expect(dropdown).toContainText(value);
  }

  async selectTimePeriod(option: string) {
    await this.openDropdown('Time Period');
    await this.page.getByRole('listbox').first().getByRole('option', { name: option, exact: true }).click();
    await this.waitForData();
  }

  async assertTimePeriodSelected(option: string) {
    const selectedOption = this.page.locator('option:checked').filter({ hasText: option }).first();
    await expect(selectedOption).toHaveText(option, { timeout: 30_000 });
  }

  async assertChartRefreshed() {
    await this.waitForData();
    await this.assertChartVisible();
  }

  async assertAssetContains(asset: string) {
    await expect(this.page.getByText(asset, { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  }

  async selectAsset(asset: string) {
    await this.safeClick(this.buttonByName(new RegExp(`^${this.escapeRegExp(asset)}$`, 'i')));
  }

  async assertAssetSelected(asset: string) {
    const chip = this.buttonByName(new RegExp(`^${this.escapeRegExp(asset)}$`, 'i'));
    await expect(chip).toBeVisible({ timeout: 30_000 });
    const selected = await chip.getAttribute('aria-pressed');
    if (selected !== null) await expect(chip).toHaveAttribute('aria-pressed', 'true');
  }

  async assertAssetChipsVisible() {
    await expect(this.page.getByText('Transformer 1', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  }

  async assertNoDataState() {
    await this.assertChartVisible();
    await expect(this.page.getByText('No data to display', { exact: true })).toBeVisible({ timeout: 30_000 });
    await expect(this.page.getByText(/broken component error/i)).toHaveCount(0);
  }

  async assertChartNavigationControls() {
    await expect(this.page.locator('button').filter({ has: this.page.locator('svg') }).first()).toBeVisible({ timeout: 30_000 });
    await expect(this.page.getByText('Electrical', { exact: true }).last()).toBeVisible();
  }

  async clickNextChart() {
    const controls = this.page.locator('button').filter({ has: this.page.locator('svg') });
    await this.safeClick(controls.last());
  }

  async selectOverviewTab() {
    await this.safeClick(this.page.getByRole('tab', { name: /^Substation Overview$/i }));
  }

  async assertOverviewSelected() {
    const tab = this.page.getByRole('tab', { name: /^Substation Overview$/i });
    await expect(tab).toBeVisible({ timeout: 30_000 });
    const ariaSelected = await tab.getAttribute('aria-selected');
    if (ariaSelected !== null) {
      await expect(tab).toHaveAttribute('aria-selected', 'true');
    } else {
      await expect(tab).toHaveClass(/active|selected/i);
    }
  }

  async clickHomeBreadcrumb() {
    await this.safeClick(this.page.getByRole('link', { name: /^Home$/i }).first());
  }

  async assertHomeDisplayed() {
    await expect(this.page.getByRole('tablist', { name: /view options/i })).toBeVisible({ timeout: 30_000 });
  }

  async assertFooterLink(link: string) {
    await expect(this.page.getByRole('link', { name: new RegExp(`^${this.escapeRegExp(link)}$`, 'i') })).toBeVisible({ timeout: 30_000 });
  }

  async assertFooterLinkEnabled(link: string) {
    await expect(this.page.getByRole('link', { name: new RegExp(`^${this.escapeRegExp(link)}$`, 'i') })).toBeEnabled({ timeout: 30_000 });
  }

  async assertLeftNavVisible() {
    await expect(this.leftNav()).toBeVisible({ timeout: 30_000 });
  }

  async assertLeftNavItemState(item: string, states: string) {
    const positions: Record<string, number> = {
      Home: 0,
      'Chart Filters': 1,
      'App Suite': 2,
      'Circuit Condition': 3,
      'Substation Search': 4,
      Settings: 5,
      Logout: 6,
    };
    const position = positions[item];
    if (position === undefined) throw new Error(`Unsupported Electrical left navigation item: "${item}"`);

    const button = this.leftNav().locator('button[type="button"]').nth(position);
    await expect(button).toBeVisible({ timeout: 30_000 });
    if (/disabled|not clickable/i.test(states)) await expect(button).toBeDisabled();
    if (/visible,?\s*clickable/i.test(states)) await expect(button).toBeEnabled();
  }

  private escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}