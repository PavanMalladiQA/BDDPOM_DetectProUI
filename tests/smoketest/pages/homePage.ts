import { expect, Page } from '@playwright/test';

export default class HomePage {
  constructor(private page: Page) {}

  private Elements = {
    // Banner Asset Metrics components
    bannerSubstationmetricsSection: "(//div[contains(@class,'flex flex-wrap')])[1]",
    bannerInstrumentmetricsSection: "(//div[contains(@class,'flex flex-wrap')])[2]",

    // Left navigation menu components (index-based; keep if app has no better ids)
    leftnavigationMenuBar: "//div[contains(@class,'w-[60px] light:bg-white')]",
    leftnavigationHomeButton: "(//button[@type='button'])[3]",
    leftnavigationSubstationFiltersButton: "(//button[@type='button'])[4]",
    leftnavigationAppsuiteButton: "(//button[@type='button'])[5]",
    leftnavigationCircuitConditionButton: "(//button[@type='button'])[6]",
    leftnavigationSubstationSearchButton: "(//button[@type='button'])[7]",
    leftnavigationSettingsButton: "(//button[@type='button'])[8]",
    leftnavigationLogoutButton: "(//button[@type='button'])[9]",

    // Additional components
    clearFiltersButton: "//button[normalize-space(text())='Clear Filters']",

    lastUpdatedTimeComponent: "//span[contains(@class,'text-xs flex')]",
    refreshButton: "//button[normalize-space(text())='Refresh']",
    downloadSubstationCSVButton: "//button[normalize-space(text())='Download Substation CSV']",

    // Substation Filters panel and controls
    substationFiltersBlock: "(//div[@class='!w-full block']//div)[1]",
    substationTypeGroundMountedChip: "//button[@aria-label='Ground Mounted']",
    substationTypePoleMountedChip: "//button[@aria-label='Pole Mounted']",
    licenseAreaDropdown: "//button[@aria-label='License Area']",
    districtDropdown: "//button[@aria-label='District']",
    instrumentSearchField: "//label[text()='Instrument search']/following-sibling::div",
    instrumentInstalledYesChip: "//button[@aria-label='Instrument Installed Yes']",
    instrumentInstalledNoChip: "//button[@aria-label='Instrument Installed No']",
    offlineInstrumentsYesChip: "//button[@aria-label='Instrument Online Yes']",
    offlineInstrumentsNoChip: "//button[@aria-label='Instrument Online No']",

    // View canvases
    mapviewCanvas: "//div[contains(@class,'overflow-hidden h-[calc(100%-60px)]')]",
    tableViewCanvas: "//div[contains(@class,'p-4 z-0')]",

    // Left navigation menu - Panel components
    alarmsLeftNavPanel: "(//div[contains(@class,'p-5 mr-2')])[1]",
    alarmCSVButton: "//button[normalize-space(text())='Alarm CSV']",
    circuitConditionLeftNavPanel: "(//div[contains(@class,'p-5 mr-2')])[2]",

    // Instrument Tile components (existing)
    substationTypeInInstrumentTile: "(//span[@class='block text-visnet-grey-100'])[1]",
    instrumentsInInstrumentTile: "(//span[@class='block text-visnet-grey-100'])[2]",
    alarmsInInstrumentTile: "(//span[@class='block text-visnet-grey-100'])[3]",
    transformersInInstrumentTile: "(//span[@class='block text-visnet-grey-100'])[4]",
    cableConditionInInstrumentTile: "(//span[@class='block text-visnet-grey-100'])[5]",

    // Quick view panel components (existing)
    quickViewPanelSubstationDetailsHeader: "//h2[normalize-space(text())='Substation Details']",
    quickViewPanelInstrumentsHeader: "//h2[normalize-space(text())='Instruments']",
    quickViewPanelCableConditionHeader: "//h2[normalize-space(text())='Cable Condition']",
    quickviewExploreButton: "(//div[@class='space-y-3 p-5']//button)[1]",
  };

  // ---------------- Helpers (prefer roles over XPath) ----------------

  private viewTab(name: 'Map' | 'Grid' | 'Table') {
    return this.page.getByRole('tablist', { name: /view options/i }).getByRole('tab', { name, exact: true });
  }

  private sortResultsByTrigger() {
    return this.page.locator('main').getByRole('button', { name: /sort results by/i });
  }

  private quickViewButtonGrid() {
    // Snapshot shows a real button with accessible name "Quick view"
    return this.page.getByRole('button', { name: 'Quick view' }).first();
  }

  private exploreButtonGrid() {
    // Snapshot shows a real button with accessible name "Explore"
    return this.page.getByRole('button', { name: 'Explore' }).first();
  }

  /**
   * Backdrop overlay that can intercept clicks:
   * <div class="fixed inset-0 bg-black opacity-30 z-[1510]"></div>
   */
  private overlayBlocker() {
    return this.page.locator('div.fixed.inset-0.bg-black').first();
  }

  /**
   * Wait briefly for overlay to go away.
   * IMPORTANT: don't hard-fail if it doesn't — some app states keep it around.
   */
  private async waitForUiToBeClickable(timeoutMs = 3_000) {
    const overlay = this.overlayBlocker();
    if ((await overlay.count()) === 0) return;

    try {
      await expect(overlay).toBeHidden({ timeout: timeoutMs });
    } catch {
      // overlay still visible; caller may use force-click fallback if needed
    }
  }

  /**
   * Select a View tab only if it's not already selected.
   * Avoid waiting on overlay if no click is required.
   */
  private async ensureTabSelected(name: 'Map' | 'Grid' | 'Table') {
    const tab = this.viewTab(name);

    // If already selected, do nothing (and don't wait on overlay)
    const selected = await tab.getAttribute('aria-selected');
    if (selected === 'true') return;

    // Only now worry about overlays (best-effort)
    await this.waitForUiToBeClickable();

    // Try normal click first
    try {
      await tab.click();
    } catch {
      // If intercepted by overlay, force-click as a last resort
      await tab.click({ force: true });
    }

    await expect(tab).toHaveAttribute('aria-selected', 'true');
  }

  // ---------------- Navigation / page state ----------------

  async gotoHome() {
    await this.page.goto('./', { waitUntil: 'domcontentloaded' });
  }

  async assertOnHomeSubCounters() {
    // 1) Scope to the banner block (from your HTML)
    const bannerSubCounters = this.page.locator(this.Elements.bannerSubstationmetricsSection);
    // 2) Assert each label exists (don’t assert the number if it can vary)
    await expect(bannerSubCounters).toBeVisible({ timeout: 15_000 });
    await expect(bannerSubCounters).toContainText(/Ground Mounted Substation/i);
    await expect(bannerSubCounters).toContainText(/Pole Mounted Substation/i);
    await expect(bannerSubCounters).toContainText(/Feeders/i);
  }

  // ---------------- Home screen key UI elements ----------------

  async assertInstrumentCountsVisible() {
    // 1) Scope to the banner block (from your HTML)
    const bannerInstrumentCounters = this.page.locator(this.Elements.bannerInstrumentmetricsSection);
    // 2) Assert each label exists (don’t assert the number if it can vary)
    await expect(bannerInstrumentCounters).toBeVisible({ timeout: 15_000 });
    await expect(bannerInstrumentCounters).toContainText(/VisNet Hub/i);
    await expect(bannerInstrumentCounters).toContainText(/Guard/i);
    await expect(bannerInstrumentCounters).toContainText(/Reclose1/i);
    await expect(bannerInstrumentCounters).toContainText(/Reclose2/i);
    await expect(bannerInstrumentCounters).toContainText(/VisNet View/i);
  }
   

  async assertLeftNavVisible() {
    await expect(this.page.locator(this.Elements.leftnavigationMenuBar)).toBeVisible();
  }

  async assertLeftNavContainsItems(items: string[]) {
    const map: Record<string, string> = {
      'Home': this.Elements.leftnavigationHomeButton,
      'Substation Filters': this.Elements.leftnavigationSubstationFiltersButton,
      'App suite': this.Elements.leftnavigationAppsuiteButton,
      'Circuit Condition': this.Elements.leftnavigationCircuitConditionButton,
      'Substation Search': this.Elements.leftnavigationSubstationSearchButton,
      'Settings': this.Elements.leftnavigationSettingsButton,
      'Logout': this.Elements.leftnavigationLogoutButton,
    };

    const shouldBeDisabled = new Set(['Home', 'Substation Search']);

    for (const item of items) {
      const selector = map[item];
      if (!selector) throw new Error(`No locator mapping for nav item: ${item}`);

      const btn = this.page.locator(selector);
      await expect(btn).toBeVisible({ timeout: 15_000 });

      if (shouldBeDisabled.has(item)) {
        await expect(btn).toBeDisabled();
      } else {
        await expect(btn).toBeEnabled();
      }
    }
  }

  async assertViewTogglesVisible(views: string[]) {
    const tablist = this.page.getByRole('tablist', { name: /view options/i });
    for (const view of views) {
      await expect(tablist.getByRole('tab', { name: view, exact: true })).toBeVisible();
    }
  }

  async assertClearFiltersVisible() {
    await expect(this.page.locator(this.Elements.clearFiltersButton)).toBeVisible();
  }

  async assertSortResultsByVisible() {
    await expect(this.sortResultsByTrigger()).toBeVisible({ timeout: 10_000 });
  }

  async assertSortResultsByHidden() {
    await expect(this.sortResultsByTrigger()).toBeHidden({ timeout: 10_000 });
  }

  async assertLastUpdatedVisible() {
    await expect(this.page.locator(this.Elements.lastUpdatedTimeComponent)).toBeVisible();
  }

  async assertRefreshVisible() {
    await expect(this.page.locator(this.Elements.refreshButton)).toBeVisible();
  }

  async assertDownloadSubstationCSVVisible() {
    await expect(this.page.locator(this.Elements.downloadSubstationCSVButton)).toBeVisible();
  }

  // ---------------- View switching (tabs) ----------------

  async switchToMapView() {
    await this.ensureTabSelected('Map');
    await this.assertMapViewVisible();
  }

  async switchToGridView() {
    await this.ensureTabSelected('Grid');
    await this.assertGridViewLoaded();
  }

  async switchToTableView() {
    await this.ensureTabSelected('Table');
    await this.assertTableViewVisible();
  }

  // Backwards-compatible methods used by existing steps
  async clickMapView() {
    await this.switchToMapView();
  }

  async clickTableView() {
    await this.switchToTableView();
  }

  async assertMapViewVisible() {
    await expect(this.page.locator(this.Elements.mapviewCanvas)).toBeVisible({ timeout: 10_000 });
  }

  async assertTableViewVisible() {
    await expect(this.page.locator(this.Elements.tableViewCanvas)).toBeVisible({ timeout: 10_000 });
  }

  // ---------------- Substation Filters panel ----------------

  async openSubstationFiltersPanel() {
    await this.page.locator(this.Elements.leftnavigationSubstationFiltersButton).click();
  }

  async assertSubstationFiltersPanelVisible() {
    await expect(this.page.locator(this.Elements.substationFiltersBlock)).toBeVisible({ timeout: 10_000 });
  }

  async assertSubstationTypeChipsVisible(chips: string[]) {
    for (const chip of chips) {
      if (chip === 'Ground Mounted') {
        await expect(this.page.locator(this.Elements.substationTypeGroundMountedChip)).toBeVisible();
      } else if (chip === 'Pole Mounted') {
        await expect(this.page.locator(this.Elements.substationTypePoleMountedChip)).toBeVisible();
      } else {
        await expect(this.page.getByRole('button', { name: chip }).first()).toBeVisible();
      }
    }
  }

  async assertLicenseAreaDisplayedAndClickable() {
    const el = this.page.locator(this.Elements.licenseAreaDropdown);
    await expect(el).toBeVisible();
    await expect(el).toBeEnabled();
  }

  async assertDistrictDisplayedAndDisabled() {
    const panel = this.page.locator(this.Elements.substationFiltersBlock);
    const el = panel.locator(this.Elements.districtDropdown).first();

    await expect(el).toBeVisible();
    await expect(el).toHaveAttribute('data-disabled', 'true');
    await expect(el).toHaveCSS('pointer-events', 'none');
  }

  async assertInstrumentFiltersSectionVisible() {
    await expect(this.page.locator(this.Elements.instrumentSearchField)).toBeVisible();
  }

  async assertInstrumentSearchVisible() {
    await expect(this.page.locator(this.Elements.instrumentSearchField)).toBeVisible();
  }

  async assertInstrumentInstalledChipsVisible(chips: string[]) {
    for (const chip of chips) {
      if (chip === 'Yes') {
        await expect(this.page.locator(this.Elements.instrumentInstalledYesChip)).toBeVisible();
      } else if (chip === 'No') {
        await expect(this.page.locator(this.Elements.instrumentInstalledNoChip)).toBeVisible();
      } else {
        await expect(this.page.getByRole('button', { name: chip }).first()).toBeVisible();
      }
    }
  }

  async assertInstrumentTypeOptionsVisible(options: string[]) {
    for (const option of options) {
      await expect(this.page.getByRole('button', { name: option }).first()).toBeVisible();
    }
  }

  async assertOfflineInstrumentChipsVisible(chips: string[]) {
    for (const chip of chips) {
      if (chip === 'Yes') {
        await expect(this.page.locator(this.Elements.offlineInstrumentsYesChip)).toBeVisible();
      } else if (chip === 'No') {
        await expect(this.page.locator(this.Elements.offlineInstrumentsNoChip)).toBeVisible();
      } else {
        await expect(this.page.getByRole('button', { name: chip }).first()).toBeVisible();
      }
    }
  }

  // ---------------- Substation cards ----------------

  async assertGridViewLoaded() {
    // ensureTabSelected('Grid') is already called by switchToGridView()
    // Now just assert grid-only content exists (Quick view exists only on Grid view).
    await this.ensureTabSelected('Grid');
    await expect(this.quickViewButtonGrid()).toBeVisible({ timeout: 15_000 });
    await expect(this.exploreButtonGrid()).toBeVisible({ timeout: 15_000 });
  }

  async assertSubstationCardKeyFieldsVisible() {
    await expect(this.page.locator(this.Elements.substationTypeInInstrumentTile).first()).toBeVisible();
    await expect(this.page.locator(this.Elements.instrumentsInInstrumentTile).first()).toBeVisible();
    await expect(this.page.locator(this.Elements.alarmsInInstrumentTile).first()).toBeVisible();
    await expect(this.page.locator(this.Elements.transformersInInstrumentTile).first()).toBeVisible();
    await expect(this.page.locator(this.Elements.cableConditionInInstrumentTile).first()).toBeVisible();
  }

  async assertQuickViewAvailableOnCards() {
    await this.switchToGridView();
    await expect(this.quickViewButtonGrid()).toBeVisible({ timeout: 15_000 });
  }

  async assertExploreAvailableOnCards() {
    await this.switchToGridView();
    await expect(this.exploreButtonGrid()).toBeVisible({ timeout: 15_000 });
  }

  // ---------------- Left nav panels ----------------

  async clickLeftNavItem(label: string) {
    const byText = this.page.getByRole('button', { name: label }).first();
    if ((await byText.count()) > 0) {
      await byText.click();
      return;
    }

    const map: Record<string, string> = {
      'App suite': this.Elements.leftnavigationAppsuiteButton,
      'Circuit Condition': this.Elements.leftnavigationCircuitConditionButton,
    };

    const sel = map[label];
    if (!sel) throw new Error(`No locator mapping for left nav item: "${label}"`);
    await this.page.locator(sel).click();
  }

  async assertAppSuitePanelVisible() {
    await expect(this.page.locator(this.Elements.alarmsLeftNavPanel)).toBeVisible({ timeout: 10_000 });
  }

  async assertAlarmCsvOptionVisible() {
    await expect(this.page.locator(this.Elements.alarmCSVButton)).toBeVisible();
  }

  async assertAlarmCsvButtonVisible() {
    const alarmsPanel = this.page
      .getByRole('complementary')
      .filter({ has: this.page.getByRole('heading', { name: 'Alarms' }) });

    const alarmCsvButton = alarmsPanel.getByRole('button', { name: 'Alarm CSV', exact: true });
    await expect(alarmCsvButton).toBeVisible({ timeout: 10_000 });
  }

  async assertCircuitConditionPanelVisible() {
    await expect(this.page.locator(this.Elements.circuitConditionLeftNavPanel)).toBeVisible({ timeout: 10_000 });
  }

  // ---------------- Quick view / Explore actions ----------------

  async clickQuickViewOnFirstCard() {
    await this.switchToGridView();

    const btn = this.quickViewButtonGrid();
    await expect(btn).toBeVisible({ timeout: 15_000 });

    // Click with best-practice fallback if overlay intercepts
    try {
      await btn.click();
    } catch {
      await btn.click({ force: true });
    }
  }

  async assertQuickViewPanelVisible() {
    await expect(this.page.locator('div.space-y-3.p-5')).toBeVisible({ timeout: 10_000 });
    await expect(this.page.locator(this.Elements.quickViewPanelSubstationDetailsHeader)).toBeVisible();
    await expect(this.page.locator(this.Elements.quickViewPanelInstrumentsHeader)).toBeVisible();
    await expect(this.page.locator(this.Elements.quickViewPanelCableConditionHeader)).toBeVisible();
  }

  async clickExploreInQuickView() {
    const btn = this.page.locator(this.Elements.quickviewExploreButton);
    await expect(btn).toBeVisible({ timeout: 15_000 });
    // Click with best-practice fallback if overlay intercepts
    try {
      await btn.click();
    } catch {
      await btn.click({ force: true });
    }
  }
  
  async assertNavigatedToSubstationDetails() {
    await expect(this.page).toHaveURL(/substation|details/i, { timeout: 15_000 });
  }
}
