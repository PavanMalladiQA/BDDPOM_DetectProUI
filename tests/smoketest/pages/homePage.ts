import { expect, Page } from '@playwright/test';

export default class HomePage {
  // Stores the browser page used by this page object.
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
    searchbySubstationNameandCode: "(//div[@data-slot='main-wrapper']//div)[1]",
    substationFiltersBlock: "//div[@class='space-y-5 mx-3 mb-3 mt-4']",
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
    exploreButtonGrid:"(//div[contains(@class,'p-3 h-auto')]//button)[2]",
    substationNameInGridTile: "//h4[@class='text-base font-bold']",
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

  // Returns the requested tab from the Home view selector.
  private viewTab(name: 'Map' | 'Grid' | 'Table') {
    return this.page.getByRole('tablist', { name: /view options/i }).getByRole('tab', { name, exact: true });
  }

  // Returns the Home page sort-results control.
  private sortResultsByTrigger() {
    return this.page.locator('main').getByRole('button', { name: /sort results by/i });
  }

  // Finds the first Quick view button in the Grid.
  private quickViewButtonGrid() {
    // Snapshot shows a real button with accessible name "Quick view"
    return this.page.getByRole('button', { name: 'Quick view' }).first();
  }

  // Finds the first Explore button in the Grid.
  private exploreButtonGrid() {
    // Snapshot shows a real button with accessible name "Explore"
    return this.page.getByRole('button', { name: 'Explore' }).first();
  }

  // Escapes a value before using it in a regular expression.
  private escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Backdrop overlay that can intercept clicks:
   * <div class="fixed inset-0 bg-black opacity-30 z-[1510]"></div>
   */
  // Finds the overlay that may intercept page clicks.
  private overlayBlocker() {
    return this.page.locator('div.fixed.inset-0.bg-black').first();
  }

  /**
   * Wait briefly for overlay to go away.
   * IMPORTANT: don't hard-fail if it doesn't — some app states keep it around.
   */
  // Waits briefly for the overlay to stop blocking interaction.
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
  // Selects a Home view tab only when it is not already selected.
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

  // Opens the Home route.
  async gotoHome() {
    await this.page.goto('./', { waitUntil: 'domcontentloaded' });
  }

  // Waits for page data to be fully loaded (per Playwright recommended pattern).
  // Waits for: (1) "Loading Data" indicator to disappear, (2) network to be idle.
  private async waitForPageReady() {
    // 1) Wait for any "Loading Data" text to disappear (if present)
    const loadingIndicator = this.page.getByText('Loading Data', { exact: true });
    if (await loadingIndicator.count()) {
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 60_000 });
    }
    // 2) Wait for network idle (ensures all data has loaded)
    await this.page.waitForLoadState('networkidle');
  }

  // Verifies the Home page's substation summary counters are visible.
  async assertOnHomeSubCounters() {
    // Wait for page to be fully ready before asserting
    await this.waitForPageReady();
    // 1) Scope to the banner block (from your HTML)
    const bannerSubCounters = this.page.locator(this.Elements.bannerSubstationmetricsSection);
    // 2) Assert each label exists (don't assert the number if it can vary)
    await expect(bannerSubCounters).toBeVisible({ timeout: 10_000 });
    await expect(bannerSubCounters).toContainText(/Ground Mounted Substation/i);
    await expect(bannerSubCounters).toContainText(/Pole Mounted Substation/i);
    await expect(bannerSubCounters).toContainText(/Feeders/i);
  }

  // ---------------- Home screen key UI elements ----------------

  // Verifies the supported instrument counters appear in the banner.
  async assertInstrumentCountsVisible() {
    // Wait for page to be fully ready before asserting
    await this.waitForPageReady();
    // 1) Scope to the banner block (from your HTML)
    const bannerInstrumentCounters = this.page.locator(this.Elements.bannerInstrumentmetricsSection);
    // 2) Assert each label exists (don't assert the number if it can vary)
    await expect(bannerInstrumentCounters).toBeVisible({ timeout: 10_000 });
    await expect(bannerInstrumentCounters).toContainText(/VisNet Hub/i);
    await expect(bannerInstrumentCounters).toContainText(/Guard/i);
    await expect(bannerInstrumentCounters).toContainText(/Reclose1/i);
    await expect(bannerInstrumentCounters).toContainText(/Reclose2/i);
    await expect(bannerInstrumentCounters).toContainText(/VisNet View/i);
  }
   

  // Verifies the Home page left navigation is visible.
  async assertLeftNavVisible() {
    await expect(this.page.locator(this.Elements.leftnavigationMenuBar)).toBeVisible();
  }

  // Verifies the requested left-navigation items and their states.
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

  // Verifies each requested Home view tab is visible.
  async assertViewTogglesVisible(views: string[]) {
    const tablist = this.page.getByRole('tablist', { name: /view options/i });
    for (const view of views) {
      await expect(tablist.getByRole('tab', { name: view, exact: true })).toBeVisible();
    }
  }

  // Verifies the Clear Filters control is visible.
  async assertClearFiltersVisible() {
    await expect(this.page.locator(this.Elements.clearFiltersButton)).toBeVisible();
  }

  // Verifies the Sort Results By control is visible.
  async assertSortResultsByVisible() {
    await expect(this.sortResultsByTrigger()).toBeVisible({ timeout: 10_000 });
  }

  // Verifies the Sort Results By control is hidden.
  async assertSortResultsByHidden() {
    await expect(this.sortResultsByTrigger()).toBeHidden({ timeout: 10_000 });
  }

  // Verifies the last-updated timestamp is visible.
  async assertLastUpdatedVisible() {
    await expect(this.page.locator(this.Elements.lastUpdatedTimeComponent)).toBeVisible();
  }

  // Verifies the Refresh control is visible.
  async assertRefreshVisible() {
    await expect(this.page.locator(this.Elements.refreshButton)).toBeVisible();
  }

  // Verifies the substation CSV download control is visible.
  async assertDownloadSubstationCSVVisible() {
    await expect(this.page.locator(this.Elements.downloadSubstationCSVButton)).toBeVisible();
  }

  // ---------------- View switching (tabs) ----------------

  // Switches to Map view and verifies its canvas.
  async switchToMapView() {
    await this.ensureTabSelected('Map');
    await this.assertMapViewVisible();
  }

  // Switches to Grid view and verifies substation cards are ready.
  async switchToGridView() {
    await this.ensureTabSelected('Grid');
    await this.assertGridViewLoaded();
  }

  // Switches to Table view and verifies its canvas.
  async switchToTableView() {
    await this.ensureTabSelected('Table');
    await this.assertTableViewVisible();
  }

  // Backwards-compatible methods used by existing steps
  // Preserves the existing step API for switching to Map view.
  async clickMapView() {
    await this.switchToMapView();
  }

  // Preserves the existing step API for switching to Table view.
  async clickTableView() {
    await this.switchToTableView();
  }

  // Verifies the Map view canvas is visible.
  async assertMapViewVisible() {
    await expect(this.page.locator(this.Elements.mapviewCanvas)).toBeVisible({ timeout: 10_000 });
  }

  // Verifies the Table view canvas is visible.
  async assertTableViewVisible() {
    await expect(this.page.locator(this.Elements.tableViewCanvas)).toBeVisible({ timeout: 10_000 });
  }

  // ---------------- Substation Filters panel ----------------

  // Opens the Substation Filters panel.
  async openSubstationFiltersPanel() {
    await this.page.locator(this.Elements.leftnavigationSubstationFiltersButton).click();
  }

  // Verifies the Substation Filters panel is visible.
  async assertSubstationFiltersPanelVisible() {
    await expect(this.page.locator(this.Elements.substationFiltersBlock)).toBeVisible({ timeout: 10_000 });
  }

  // Verifies the requested substation type filter chips are visible.
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

  // Verifies the License Area control is visible and enabled.
  async assertLicenseAreaDisplayedAndClickable() {
    const el = this.page.locator(this.Elements.licenseAreaDropdown);
    await expect(el).toBeVisible();
    await expect(el).toBeEnabled();
  }

  // Verifies the District control is disabled by default.
  async assertDistrictDisplayedAndDisabled() {
    const panel = this.page.locator(this.Elements.substationFiltersBlock);
    const el = panel.locator(this.Elements.districtDropdown).first();

    await expect(el).toBeVisible();
    await expect(el).toHaveAttribute('data-disabled', 'true');
    await expect(el).toHaveCSS('pointer-events', 'none');
  }

  // Verifies the Instrument Filters section is visible.
  async assertInstrumentFiltersSectionVisible() {
    await expect(this.page.locator(this.Elements.instrumentSearchField)).toBeVisible();
  }

  // Verifies the Instrument Search control is visible.
  async assertInstrumentSearchVisible() {
    await expect(this.page.locator(this.Elements.instrumentSearchField)).toBeVisible();
  }

  // Verifies the requested Instrument Installed chips are visible.
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

  // Verifies the requested instrument type options are visible.
  async assertInstrumentTypeOptionsVisible(options: string[]) {
    for (const option of options) {
      await expect(this.page.getByRole('button', { name: option }).first()).toBeVisible();
    }
  }

  // Verifies the requested offline-instrument chips are visible.
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

  // Verifies Grid view and its card actions are loaded.
  async assertGridViewLoaded() {
    // ensureTabSelected('Grid') is already called by switchToGridView()
    // Now just assert grid-only content exists (Quick view exists only on Grid view).
    await this.ensureTabSelected('Grid');
    await expect(this.quickViewButtonGrid()).toBeVisible({ timeout: 15_000 });
    await expect(this.exploreButtonGrid()).toBeVisible({ timeout: 15_000 });
  }

  // Verifies the key information fields appear on a substation card.
  async assertSubstationCardKeyFieldsVisible() {
    await expect(this.page.locator(this.Elements.substationTypeInInstrumentTile).first()).toBeVisible();
    await expect(this.page.locator(this.Elements.instrumentsInInstrumentTile).first()).toBeVisible();
    await expect(this.page.locator(this.Elements.alarmsInInstrumentTile).first()).toBeVisible();
    await expect(this.page.locator(this.Elements.transformersInInstrumentTile).first()).toBeVisible();
    await expect(this.page.locator(this.Elements.cableConditionInInstrumentTile).first()).toBeVisible();
  }

  // Verifies Quick view is available on substation cards.
  async assertQuickViewAvailableOnCards() {
    await this.switchToGridView();
    await expect(this.quickViewButtonGrid()).toBeVisible({ timeout: 15_000 });
  }

  // Verifies Explore is available on substation cards.
  async assertExploreAvailableOnCards() {
    await this.switchToGridView();
    await expect(this.exploreButtonGrid()).toBeVisible({ timeout: 15_000 });
  }

  // ---------------- Left nav panels ----------------

  // Clicks a left-navigation item by label, using a fallback mapping when needed.
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

  // Verifies the App suite panel is visible.
  async assertAppSuitePanelVisible() {
    await expect(this.page.locator(this.Elements.alarmsLeftNavPanel)).toBeVisible({ timeout: 10_000 });
  }

  // Verifies the Alarm CSV option is visible in its panel.
  async assertAlarmCsvOptionVisible() {
    await expect(this.page.locator(this.Elements.alarmCSVButton)).toBeVisible();
  }

  // Verifies the Alarm CSV link is visible in the Alarms panel.
  async assertAlarmCsvButtonVisible() {
    const alarmsPanel = this.page
      .getByRole('complementary')
      .filter({ has: this.page.getByRole('heading', { name: 'Alarms' }) });

    const alarmCsvButton = alarmsPanel.getByRole('button', { name: 'Alarm CSV', exact: true });
    await expect(alarmCsvButton).toBeVisible({ timeout: 10_000 });
  }

  // Verifies the Circuit Condition panel is visible.
  async assertCircuitConditionPanelVisible() {
    await expect(this.page.locator(this.Elements.circuitConditionLeftNavPanel)).toBeVisible({ timeout: 10_000 });
  }

  // ---------------- Quick view / Explore actions ----------------

  // Searches for a named substation and returns its Grid card, failing if not exactly one match.
  private async findSubstationCard(substationName?: string) {
    const searchTerm = substationName?.trim();
    if (!searchTerm) {
      throw new Error('A substation name or code must be provided before running this test.');
    }

    const searchInput = this.page
      .locator(this.Elements.searchbySubstationNameandCode)
      .locator('input')
      .first();
    await expect(searchInput).toBeVisible({ timeout: 15_000 });
    await searchInput.fill(searchTerm);

    await this.switchToGridView();

    const substationHeading = this.page
      .locator(this.Elements.substationNameInGridTile)
      .filter({ hasText: searchTerm });
    await expect(
      substationHeading,
      `No substation matching "${searchTerm}" was found in the filtered grid.`,
    ).toHaveCount(1, { timeout: 15_000 });
    await expect(substationHeading).toBeVisible({ timeout: 15_000 });
    await expect(substationHeading).toContainText(searchTerm);

    return substationHeading.locator('xpath=ancestor::div[.//button[normalize-space(.)="Explore"]][1]');
  }

  // Searches for a named substation and opens Quick view on its Grid card.
  async clickQuickViewOnSubstation(substationName?: string) {
    const card = await this.findSubstationCard(substationName);
    await this.waitForOverlayToClear(10_000);

    // Grid data can re-render between locating and clicking; retry once on a stale/detached element.
    for (let attempt = 1; attempt <= 2; attempt++) {
      const btn = card.getByRole('button', { name: 'Quick view', exact: true }).first();
      await expect(btn).toBeVisible({ timeout: 15_000 });

      try {
        await btn.click({ timeout: 15_000 });
        return;
      } catch (err) {
        if (attempt === 2) throw err;
        await this.waitForOverlayToClear(5_000);
      }
    }
  }

  // Searches for a named substation and opens Explore on its Grid card.
  async clickExploreOnSubstation(substationName?: string) {
    const card = await this.findSubstationCard(substationName);

    const btn = card.getByRole('button', { name: 'Explore', exact: true }).first();
    await expect(btn).toBeVisible({ timeout: 15_000 });

    // Click with best-practice fallback if overlay intercepts
    try {
      await btn.click();
    } catch {
      await btn.click({ force: true });
    }
  }

  // Verifies the Quick view panel and its main sections are visible.
  async assertQuickViewPanelVisible() {
    await expect(this.page.locator('div.space-y-3.p-5')).toBeVisible({ timeout: 10_000 });
    await expect(this.page.locator(this.Elements.quickViewPanelSubstationDetailsHeader)).toBeVisible();
    await expect(this.page.locator(this.Elements.quickViewPanelInstrumentsHeader)).toBeVisible();
    await expect(this.page.locator(this.Elements.quickViewPanelCableConditionHeader)).toBeVisible();
  }


  // Waits for an overlay to become hidden or detached before clicking.
  private async waitForOverlayToClear(timeoutMs = 10_000) {
  const overlay = this.overlayBlocker();
  if (await overlay.count()) {
    await overlay.waitFor({ state: 'hidden', timeout: timeoutMs }).catch(() => {});
    // also handle "detached" case
    if (await overlay.count()) {
      await overlay.waitFor({ state: 'detached', timeout: 2_000 }).catch(() => {});
    }
  }
}

  // Opens Explore from the currently displayed Quick view panel.
  async clickExploreInQuickView() {
    const quickViewPanel = this.page.locator('div.space-y-3.p-5').filter({ has: this.page.getByRole('button', { name: /^explore$/i }) }).last();
    const btn = quickViewPanel.getByRole('button', { name: /^explore$/i }).first();

    await expect(quickViewPanel).toBeVisible({ timeout: 15_000 });
    await expect(btn).toBeVisible({ timeout: 15_000 });
    await this.waitForOverlayToClear(10_000);

    try {
      await Promise.all([
        this.page.waitForURL(/substation|details/i, { timeout: 20_000 }).catch(() => {}),
        btn.click({ timeout: 15_000 }),
      ]);
    } catch {
      await Promise.all([
        this.page.waitForURL(/substation|details/i, { timeout: 20_000 }).catch(() => {}),
        btn.click({ force: true, timeout: 15_000 }),
      ]);
    }
  }

  // Verifies navigation reached a substation details route.
  async assertNavigatedToSubstationDetails() {
    await expect(this.page).toHaveURL(/substation|details/i, { timeout: 15_000 });
  }
}
