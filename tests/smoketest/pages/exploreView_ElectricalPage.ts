import { expect, Locator, Page } from '@playwright/test';

export default class ExploreView_ElectricalPage {
  // Stores the browser page used by this page object.
  constructor(private page: Page) {}

  // ---------------- Locators ----------------
  private Elements = {
    // Core view shell and navigation
    leftNavPanel: "(//div[contains(@class,'flex flex-col')])[2]",
    electricalTab: ":text-is('Electrical')",

    // Chart Filters panel
    chartFiltersHeader: "//h2[normalize-space()='Chart Filters']",

    // Chart / empty state and controls
    electricalChart: "img[alt*=' - Transformer' i], canvas[class*='am5-layer']",
    noDataState: ":text-is('No data to display')",
  };

  // Returns the Electrical view's left navigation container.
  private leftNav() {
    return this.page.locator(this.Elements.leftNavPanel);
  }

  // Finds the first button matching an accessible name.
  private buttonByName(name: string | RegExp) {
    return this.page.getByRole('button', { name }).first();
  }

  // Finds the first dropdown button matching a label.
  private dropdown(label: string) {
    return this.page.getByRole('button', { name: new RegExp(label, 'i') }).first();
  }

  // Clicks a visible, enabled control and retries with force if needed.
  private async safeClick(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: 30_000 });
    await expect(locator).toBeEnabled({ timeout: 30_000 });
    try {
      await locator.click();
    } catch {
      await locator.click({ force: true });
    }
  }

  // Waits for the chart data-loading indicator to disappear.
  private async waitForData() {
    const loading = this.page.getByText('Loading Data', { exact: true });
    if (await loading.count()) {
      await expect(loading).toBeHidden({ timeout: 90_000 });
    }
  }

  // Selects the Electrical Explore tab.
  async selectElectricalTab() {
    const tab = this.page.locator(this.Elements.electricalTab).last();
    await expect(tab).toBeVisible({ timeout: 30_000 });
    if ((await tab.getAttribute('aria-selected')) !== 'true') await this.safeClick(tab);
  }

  // Verifies that the Electrical Explore tab is selected.
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

  // Verifies Home and Electrical appear in the breadcrumb.
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

  // Verifies the Chart Filters panel is visible.
  async assertChartFiltersVisible() {
    await expect(this.page.locator(this.Elements.chartFiltersHeader)).toBeVisible({ timeout: 30_000 });
  }

  // Verifies the chart title identifies a transformer chart.
  async assertChartTitle() {
    await expect(this.page.getByRole('img', { name: /.+\s-\sTransformer\s.+/i })).toBeVisible({ timeout: 30_000 });
  }

  // Verifies the Electrical chart or its empty-data state is visible.
  async assertChartVisible() {
    const chart = this.page.locator(this.Elements.electricalChart).first();
    if (await chart.count()) {
      await expect(chart).toBeVisible({ timeout: 30_000 });
      return;
    }
    await expect(this.page.locator(this.Elements.noDataState).first()).toBeVisible({ timeout: 30_000 });
  }

  // Verifies an Explore tab is visible by name.
  async assertExploreTabVisible(tab: string) {
    await expect(this.buttonByName(new RegExp(`^${this.escapeRegExp(tab)}$`, 'i'))).toBeVisible({ timeout: 30_000 });
  }

  // Verifies an Explore tab is enabled by name.
  async assertExploreTabEnabled(tab: string) {
    await expect(this.buttonByName(new RegExp(`^${this.escapeRegExp(tab)}$`, 'i'))).toBeEnabled({ timeout: 30_000 });
  }

  // Verifies a labeled chart control is visible.
  async assertControlVisible(label: string) {
    await expect(this.dropdown(label)).toBeVisible({ timeout: 30_000 });
  }

  // Reports whether a labeled chart control is currently visible.
  async isControlAvailable(label: string): Promise<boolean> {
    return this.dropdown(label).isVisible().catch(() => false);
  }

  // Verifies a labeled section is visible.
  async assertSectionVisible(label: string) {
    await expect(this.page.getByText(label, { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  }

  // Opens the dropdown matching a label.
  async openDropdown(label: string) {
    await this.safeClick(this.dropdown(label));
  }

  // Verifies the currently open dropdown exposes a listbox.
  async assertDropdownOptionsVisible() {
    await expect(this.page.getByRole('listbox').first()).toBeVisible({ timeout: 30_000 });
  }

  // Verifies an open dropdown contains the requested option.
  async assertDropdownContains(option: string) {
    const matchingOption = this.page.getByRole('listbox').first().getByRole('option').filter({ hasText: option }).first();
    await expect(matchingOption).toBeVisible({ timeout: 30_000 });
  }

  // Selects the first option in the currently open dropdown.
  async selectFirstDropdownOption() {
    await this.safeClick(this.page.getByRole('listbox').first().getByRole('option').first());
  }

  // Selects the first available instrument option.
  async selectAvailableInstrument() {
    const options = this.page.getByRole('listbox').first().getByRole('option');
    await expect(options.first()).toBeVisible({ timeout: 30_000 });
    await options.first().click();
  }

  // Verifies the selected dropdown and, optionally, its displayed value.
  async assertSelectedDropdown(label: string, value?: string) {
    const dropdown = this.dropdown(label);
    await expect(dropdown).toBeVisible({ timeout: 30_000 });
    if (value) await expect(dropdown).toContainText(value);
  }

  // Selects a time period and waits for chart data to settle.
  async selectTimePeriod(option: string) {
    await this.openDropdown('Time Period');
    await this.page.getByRole('listbox').first().getByRole('option', { name: option, exact: true }).click();
    await this.waitForData();
  }

  // Verifies the requested time period is selected.
  async assertTimePeriodSelected(option: string) {
    const selectedOption = this.page.locator('option:checked').filter({ hasText: option }).first();
    await expect(selectedOption).toHaveText(option, { timeout: 30_000 });
  }

  // Waits for refreshed data and verifies the chart remains visible.
  async assertChartRefreshed() {
    await this.waitForData();
    await this.assertChartVisible();
  }

  // Verifies an asset label is visible.
  async assertAssetContains(asset: string) {
    await expect(this.page.getByText(asset, { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  }

  // Selects the asset button matching a label.
  async selectAsset(asset: string) {
    await this.safeClick(this.buttonByName(new RegExp(`^${this.escapeRegExp(asset)}$`, 'i')));
  }

  // Verifies the requested asset is selected when selection state is exposed.
  async assertAssetSelected(asset: string) {
    const chip = this.buttonByName(new RegExp(`^${this.escapeRegExp(asset)}$`, 'i'));
    await expect(chip).toBeVisible({ timeout: 30_000 });
    const selected = await chip.getAttribute('aria-pressed');
    if (selected !== null) await expect(chip).toHaveAttribute('aria-pressed', 'true');
  }

  // Verifies the default Transformer 1 asset chip is visible.
  async assertAssetChipsVisible() {
    await expect(this.page.getByText('Transformer 1', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  }

  // Verifies the chart displays its empty-data state without a broken-component error.
  async assertNoDataState() {
    await this.assertChartVisible();
    await expect(this.page.getByText('No data to display', { exact: true })).toBeVisible({ timeout: 30_000 });
    await expect(this.page.getByText(/broken component error/i)).toHaveCount(0);
  }

  // Verifies chart navigation controls and the Electrical view label are visible.
  async assertChartNavigationControls() {
    await expect(this.page.locator('button').filter({ has: this.page.locator('svg') }).first()).toBeVisible({ timeout: 30_000 });
    await expect(this.page.getByText('Electrical', { exact: true }).last()).toBeVisible();
  }

  // Advances to the next chart using the last chart control button.
  async clickNextChart() {
    const controls = this.page.locator('button').filter({ has: this.page.locator('svg') });
    await this.safeClick(controls.last());
  }

  // Selects the Substation Overview tab.
  async selectOverviewTab() {
    await this.safeClick(this.page.getByRole('tab', { name: /^Substation Overview$/i }));
  }

  // Verifies the Substation Overview tab is selected.
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

  // Navigates home using the breadcrumb link.
  async clickHomeBreadcrumb() {
    await this.safeClick(this.page.getByRole('link', { name: /^Home$/i }).first());
  }

  // Verifies the Home view options are displayed.
  async assertHomeDisplayed() {
    await expect(this.page.getByRole('tablist', { name: /view options/i })).toBeVisible({ timeout: 30_000 });
  }

  // Verifies a footer link is visible by its name.
  async assertFooterLink(link: string) {
    await expect(this.page.getByRole('link', { name: new RegExp(`^${this.escapeRegExp(link)}$`, 'i') })).toBeVisible({ timeout: 30_000 });
  }

  // Verifies a footer link is enabled by its name.
  async assertFooterLinkEnabled(link: string) {
    await expect(this.page.getByRole('link', { name: new RegExp(`^${this.escapeRegExp(link)}$`, 'i') })).toBeEnabled({ timeout: 30_000 });
  }

  // Verifies the Electrical view left navigation is visible.
  async assertLeftNavVisible() {
    await expect(this.leftNav()).toBeVisible({ timeout: 30_000 });
  }

  // Verifies the requested left-navigation item's enabled state.
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

  // Escapes a value before using it in a regular expression.
  private escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}