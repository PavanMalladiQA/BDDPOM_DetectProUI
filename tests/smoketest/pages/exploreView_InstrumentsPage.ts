import { expect, Page } from '@playwright/test';
import { DataTable } from '@cucumber/cucumber';

export default class ExploreViewInstrumentsPage {
  // Stores the browser page used by this page object.
  constructor(private readonly page: Page) {}

  private readonly Elements = {
    hierarchyInstrumentButtons: 'button[aria-pressed]',
    selectedHierarchyInstrument: 'button[aria-pressed="true"]',
    signalStrengthGraph: '#signal-strength-chart[role="img"][aria-label="Signal Strength"]',
    signalQualityGraph: '#signal-quality-chart[role="img"][aria-label="Signal Quality"]',
    internalBatteryVoltageGraph: '#battery-voltage-chart[role="img"][aria-label="Internal Battery Voltage"]',
    switchTemperatureGraph: '#chartdiv[role="img"][aria-label="Switch Temperature"]',
    leftNavPanel: "(//div[contains(@class,'flex flex-col')])[2]",
  };

  // Returns the Instruments view's left navigation container.
  private leftNav() {
    return this.page.locator(this.Elements.leftNavPanel);
  }

  // Maps a left-navigation label to its button locator.
  private navButtonFor(item: string) {
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
    if (position === undefined) throw new Error(`Unsupported Instruments left navigation item: "${item}"`);
    return this.leftNav().locator('button[type="button"]').nth(position);
  }
  
  // Finds the nearest details section for an exact heading.
  private section(title: string) {
    return this.page
      .getByText(title, { exact: true })
      .first()
      .locator('xpath=../..');
  }

  // Resolves a graph title to its chart locator.
  private graph(graphTitle: string) {
    const selectors: Record<string, string> = {
      'Signal Strength': this.Elements.signalStrengthGraph,
      'Signal Quality': this.Elements.signalQualityGraph,
      'Internal Battery Voltage': this.Elements.internalBatteryVoltageGraph,
      'Switch Temperature': this.Elements.switchTemperatureGraph,
    };

    return selectors[graphTitle]
      ? this.page.locator(selectors[graphTitle])
      : this.page.getByRole('img', { name: graphTitle, exact: true });
  }

  // Finds the visible instrument label in the Instruments list.
  private instrumentRow(instrument: string) {
    return this.page.getByText(instrument, { exact: true }).first();
  }

  // Verifies the Instruments route, overview, and time-period controls are loaded.
  async assertInstrumentsViewLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/instruments(?:[\/?#]|$)/i, { timeout: 30_000 });
    await expect(this.page.getByText('Instrument Overview', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
    await expect(this.page.getByText('Time Period', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  }

  // Reports whether an instrument is visible in the Instruments list.
  async isInstrumentAvailable(instrument: string): Promise<boolean> {
    const row = this.instrumentRow(instrument);
    if (await row.count()) return await row.isVisible().catch(() => false);
    return false;
  }

  // Selects an available instrument and waits for its overview to appear.
  async selectInstrument(instrument: string): Promise<boolean> {
    const row = this.instrumentRow(instrument);
    if (!(await row.count()) || !(await row.isVisible().catch(() => false))) return false;

    await row.click();
    await expect(this.overviewCard(instrument)).toBeVisible({ timeout: 30_000 });
    return true;
  }

  // Selects a hierarchy instrument and verifies its pressed state.
  async selectHierarchyInstrument(instrument: string): Promise<void> {
    const hierarchyInstrument = this.page
      .locator(this.Elements.hierarchyInstrumentButtons)
      .filter({ hasText: instrument })
      .first();

    await expect(hierarchyInstrument).toBeVisible({ timeout: 30_000 });
    await hierarchyInstrument.click();
    await expect(hierarchyInstrument).toHaveAttribute('aria-pressed', 'true');
  }

  // Verifies the requested hierarchy instrument is selected.
  async assertHierarchyInstrumentSelected(instrument: string): Promise<void> {
    const selectedInstrument = this.page
      .locator(this.Elements.selectedHierarchyInstrument)
      .filter({ hasText: instrument })
      .first();

    await expect(selectedInstrument).toBeVisible({ timeout: 30_000 });
  }

  // Locates the overview card containing the requested device name.
  private overviewCard(device: string) {
    return this.page
      .getByText('Instrument Overview', { exact: true })
      .first()
      .locator('xpath=../..')
      .filter({ has: this.page.getByText(device, { exact: true }) });
  }

  // Verifies the requested shared overview fields for an instrument.
  async assertInstrumentOverviewFields(device: string, fields: DataTable): Promise<void> {
    const overview = this.overviewCard(device);
    await expect(overview).toBeVisible({ timeout: 30_000 });

    for (const [field] of fields.raw().slice(1)) {
      await expect(overview.getByText(field, { exact: true }).first()).toBeVisible({ timeout: 15_000 });
    }
  }

  // Verifies the requested fields within a named details section.
  async assertSectionFields(sectionTitle: string, fields: DataTable): Promise<void> {
    const section = this.section(sectionTitle);
    await expect(section).toBeVisible({ timeout: 30_000 });

    for (const [field] of fields.raw().slice(1)) {
      await expect(section.getByText(field, { exact: true }).first()).toBeVisible({ timeout: 15_000 });
    }
  }

  // Verifies that each requested graph is visible.
  async assertGraphComponents(graphs: DataTable): Promise<void> {
    await expect(this.page.getByText('Time Period', { exact: true }).first()).toBeVisible({ timeout: 30_000 });

    for (const [graph] of graphs.raw().slice(1)) {
      await expect(this.graph(graph)).toBeVisible({ timeout: 30_000 });
    }
  }

  // Verifies the Instruments view left navigation is visible.
  async assertLeftNavVisible(): Promise<void> {
    await expect(this.leftNav()).toBeVisible({ timeout: 30_000 });
  }

  // Verifies the requested left-navigation item's enabled state.
  async assertLeftNavItemState(item: string, states: string): Promise<void> {
    const button = this.navButtonFor(item);
    await expect(button).toBeVisible({ timeout: 30_000 });
    if (/disabled|not clickable/i.test(states)) await expect(button).toBeDisabled();
    if (/visible,?\s*clickable/i.test(states)) await expect(button).toBeEnabled();
  }

}
