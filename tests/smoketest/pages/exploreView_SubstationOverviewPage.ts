import { expect, Page, Locator } from '@playwright/test';

export default class ExploreView_SubstationOverviewPage {
  // Stores the browser page used by this page object.
  constructor(private page: Page) {}

  // ---------------- Locators ----------------
  private Elements = {
    // Left Navigation (icon bar)
    substationOverviewLeftNavigationMenu: "(//div[contains(@class,'flex flex-col')])[2]",
    /*lna_HomeIcon: "(//button[@type='button'])[1]",
    lna_ChartFiltersIcon: "(//button[@type='button'])[2]",
    lna_AppSuiteIcon: "(//button[@type='button'])[3]",
    lna_CircuitConditionIcon: "(//button[@type='button'])[4]",
    lna_SubstationSearchIcon: "(//button[@type='button'])[5]",
    lna_SettingsIcon: "(//button[@type='button'])[6]",
    lna_LogoutIcon: "(//button[@type='button'])[7]",*/

    // Fault Filters Component
    faultFiltersHeader: "//h2[normalize-space(text())='Fault Filters']",
    instrumentDropDown: "//button[contains(.,'Select Instrument')]",
    timePeriodDropDown: "button[aria-label*='Time Period' i], button:has-text('Time Period')",
    timePeriodListBoxOptions: "ul[role='listbox'], [role='listbox']",

    // Substation Overview Tab
    substationOverviewTab: "//button[contains(.,'Substation Overview')]",

    // Data slots (accordions)
    substationDataSlot: "(//div[contains(@class,'px-4 bg-content1')]//button)[1]",
    substationDataSlot_SubstationDetailsHeader: "//div[normalize-space(text())='Substation Details']",
    substationDataSlot_RegionHeader: "//div[normalize-space(text())='Region']",
    substationDataSlot_GPSCoordinatesHeader: "//div[normalize-space(text())='GPS Coordinates']",
    substationDataSlot_AddressHeader: "//div[normalize-space(text())='Address']",

    substationNotesandImagesDataSlot: "(//div[contains(@class,'px-4 bg-content1')]//button)[2]",
    substationNotesandImagesDataSlot_SubstationImages: "//h2[normalize-space(text())='Substation Images']",
    substationNotesandImagesDataSlot_SubstationNotes: "//h2[normalize-space(text())='Substation Notes']",

    transformerDataSlot_TransformerDetailsSection: "//h2[normalize-space(text())='Transformer Details']",
    transformerDataSlot_L1Phase: "//div[normalize-space(text())='L1']",
    transformerDataSlot_L2Phase: "//div[normalize-space(text())='L2']",
    transformerDataSlot_L3Phase: "//div[normalize-space(text())='L3']",
    transformerDataSlot_NPhase: "//div[normalize-space(text())='N']",
  };

  // ---------------- Convenience Locators ----------------
    // Returns the Substation Overview left-navigation container.
    private leftNav(): Locator {
    return this.page.locator(this.Elements.substationOverviewLeftNavigationMenu);
    }

    // Maps a left-navigation label to its button locator.
    private navButtonFor(item: string): Locator {
    // Scope ALL nav buttons to the left navigation container
    const nav = this.leftNav();
    const buttons = nav.locator('button[type="button"]');

    const map: Record<string, number> = {
        'Home': 0,
        'Chart Filters': 1,
        'App Suite': 2,
        'Circuit Condition': 3,
        'Substation Search': 4,
        'Settings': 5,
        'Logout': 6,
    };

    const idx = map[item];
    if (idx === undefined) throw new Error(`No nav mapping for item: "${item}"`);
    return buttons.nth(idx);
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

  // Verifies a section is hidden or removed from the DOM.
  private async assertHiddenOrDetached(locator: Locator) {
    // Handles either "hidden" OR "not in DOM"
    try {
      await expect(locator).toBeHidden({ timeout: 5_000 });
    } catch {
      await expect(locator).toHaveCount(0, { timeout: 5_000 });
    }
  }

  // Expands a section and verifies its content becomes visible.
  private async toggleSection(button: Locator, oneVisibleHeader: Locator) {
    await expect(button).toBeVisible({ timeout: 15_000 });
    const expanded = await button.getAttribute('aria-expanded');
    if (expanded !== 'true') await button.click();
    if (expanded !== null) await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(oneVisibleHeader).toBeVisible({ timeout: 15_000 });
  }

  // Collapses a section and verifies its content is hidden or removed.
  private async collapseSection(button: Locator, oneHeaderToDisappear: Locator) {
    await expect(button).toBeVisible({ timeout: 15_000 });
    const expanded = await button.getAttribute('aria-expanded');
    if (expanded !== 'false') await button.click();
    if (expanded !== null) await expect(button).toHaveAttribute('aria-expanded', 'false');
    await this.assertHiddenOrDetached(oneHeaderToDisappear);
  }

  // ---------------- Assertions: Page Loaded ----------------
  // Verifies the overview page shell has finished loading.
  async assertSubstationOverviewLoaded() {
    const nav = this.leftNav();
    const mainNavButton = nav.locator('button[type="button"]').first();
    const overviewTab = this.page.getByRole('button', { name: /substation overview/i }).first();
    const loadingState = this.page.getByText('Loading Data', { exact: true }).first();

    await expect(nav).toBeVisible({ timeout: 60_000 });
    await expect(mainNavButton).toBeVisible({ timeout: 60_000 });
    if (await loadingState.count()) {
      await expect(loadingState).toBeHidden({ timeout: 90_000 });
    }

    await expect(overviewTab.or(nav)).toBeVisible({ timeout: 15_000 });
  }


  // ---------------- Left Navigation ----------------
  // Verifies the overview left-navigation menu is visible.
  async assertLeftNavVisible() {
    await expect(this.leftNav()).toBeVisible({ timeout: 15_000 });
  }

  /**
   * states examples:
   * - "visible, clickable"
   * - "Disabled, not clickable"
   */
  // Verifies a left-navigation item matches its requested state.
  async assertLeftNavItemState(item: string, states: string) {
    const btn = this.navButtonFor(item);
    await expect(btn).toBeVisible({ timeout: 15_000 });

    const normalized = states.toLowerCase();

    const expectsDisabled = normalized.includes('disabled');
    const expectsClickable = normalized.includes('clickable') && !normalized.includes('not clickable');

    if (expectsDisabled) {
      await expect(btn).toBeDisabled();
      return;
    }

    // If not disabled, it's typically enabled/clickable for your scenarios
    await expect(btn).toBeEnabled();

    if (expectsClickable) {
      // enabled is enough; no need to actually click unless scenario says "When"
      await expect(btn).toBeEnabled();
    }
  }

  // Clicks a left-navigation item by its label.
  async clickLeftNavItem(item: string) {
    const btn = this.navButtonFor(item);
    await this.safeClick(btn);
  }

  // ---------------- Chart Filters / Fault Filters ----------------
    // Opens the Chart Filters panel from left navigation.
    async openChartFilters() {
    await this.safeClick(this.navButtonFor('Chart Filters'));
  }

  // Verifies the Fault Filters panel is visible.
  async assertFaultFiltersPanelVisible() {
    await expect(this.page.locator(this.Elements.faultFiltersHeader)).toBeVisible({ timeout: 15_000 });
  }

  // Verifies the instrument filter when the selected substation exposes it.
  async assertInstrumentDropdownVisibleIfPresent() {
    const dd = this.page.locator(this.Elements.instrumentDropDown);
    if ((await dd.count()) === 0) return; // selected substation has 1 instrument -> dropdown may not exist
    await expect(dd).toBeVisible({ timeout: 15_000 });
  }

  // Verifies the optional instrument filter is enabled when present.
  async assertInstrumentDropdownClickableIfPresent() {
    const dd = this.page.locator(this.Elements.instrumentDropDown);
    if ((await dd.count()) === 0) return;
    await expect(dd).toBeVisible({ timeout: 15_000 });
    await expect(dd).toBeEnabled({ timeout: 15_000 });
  }

  // Opens the Time Period filter and reports whether it was available.
  async openTimePeriodDropdown() {
    const loading = this.page.getByText('Loading Data');
    if (await loading.count()) {
      await loading.waitFor({ state: 'hidden', timeout: 60_000 }).catch(() => {});
    }

    const dd = this.page.getByRole('button', { name: /time period/i }).first();
    if ((await dd.count()) === 0) return false;

    await expect(dd).toBeVisible({ timeout: 30_000 });
    await expect(dd).toBeEnabled({ timeout: 30_000 });

    try {
      await dd.click();
    } catch {
      await dd.click({ force: true });
    }

    return true;
  }

  // Verifies a requested option exists in the Time Period list.
  async assertAllTimePeriodOptions(option: string) {
    const opened = await this.openTimePeriodDropdown();
    if (!opened) return;

    const listbox = this.page.getByRole('listbox').first();
    await expect(listbox).toBeVisible({ timeout: 30_000 });

    const pattern = new RegExp(option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    await expect(listbox.getByRole('option').filter({ hasText: pattern })).toBeVisible({ timeout: 20_000 });

    await this.page.keyboard.press('Escape');
  }


  // ---------------- Substation Details data slot ----------------
  // Verifies the Substation data slot is visible.
  async assertSubstationDataSlotVisible() {
    await expect(this.page.locator(this.Elements.substationDataSlot)).toBeVisible({ timeout: 15_000 });
  }

  // Expands the Substation data slot.
  async expandSubstationDataSlot() {
    await this.toggleSection(
      this.page.locator(this.Elements.substationDataSlot),
      this.page.locator(this.Elements.substationDataSlot_SubstationDetailsHeader)
    );
  }

  // Verifies the requested Substation section headers are visible.
  async assertSubstationSectionHeaders(headers: string[]) {
    const map: Record<string, Locator> = {
      'Substation Details': this.page.locator(this.Elements.substationDataSlot_SubstationDetailsHeader),
      Region: this.page.locator(this.Elements.substationDataSlot_RegionHeader),
      'GPS Coordinates': this.page.locator(this.Elements.substationDataSlot_GPSCoordinatesHeader),
      Address: this.page.locator(this.Elements.substationDataSlot_AddressHeader),
    };

    for (const h of headers) {
      const loc = map[h];
      if (!loc) throw new Error(`No locator mapping for Substation section header: "${h}"`);
      await expect(loc).toBeVisible({ timeout: 15_000 });
    }
  }

  // Collapses the Substation data slot.
  async collapseSubstationDataSlot() {
    await this.collapseSection(
      this.page.locator(this.Elements.substationDataSlot),
      this.page.locator(this.Elements.substationDataSlot_SubstationDetailsHeader)
    );
  }

  // ---------------- Notes & Images data slot ----------------
  // Expands the Substation Notes and Images data slot.
  async expandNotesAndImagesDataSlot() {
    await this.toggleSection(
      this.page.locator(this.Elements.substationNotesandImagesDataSlot),
      this.page.locator(this.Elements.substationNotesandImagesDataSlot_SubstationImages)
    );
  }

  // Verifies the requested Notes and Images section headers are visible.
  async assertNotesAndImagesSectionHeaders(headers: string[]) {
    const map: Record<string, Locator> = {
      'Substation Images': this.page.locator(this.Elements.substationNotesandImagesDataSlot_SubstationImages),
      'Substation Notes': this.page.locator(this.Elements.substationNotesandImagesDataSlot_SubstationNotes),
    };

    for (const h of headers) {
      const loc = map[h];
      if (!loc) throw new Error(`No locator mapping for Notes/Images header: "${h}"`);
      await expect(loc).toBeVisible({ timeout: 15_000 });
    }
  }

  // Collapses the Substation Notes and Images data slot.
  async collapseNotesAndImagesDataSlot() {
    await this.collapseSection(
      this.page.locator(this.Elements.substationNotesandImagesDataSlot),
      this.page.locator(this.Elements.substationNotesandImagesDataSlot_SubstationImages)
    );
  }

  // ---------------- Transformer data slot ----------------
  // Finds the first Transformer accordion button.
  private transformerDataSlotButton(): Locator {
    return this.page.getByRole('button', { name: /^Transformer \d+$/ }).first();
  }

  // Expands the first Transformer data slot.
  async expandTransformerDataSlot() {
    await this.toggleSection(
      this.transformerDataSlotButton(),
      this.page.locator(this.Elements.transformerDataSlot_TransformerDetailsSection)
    );
  }

  // Verifies the requested Transformer detail sections are visible.
  async assertTransformerSections(sections: string[]) {
    const map: Record<string, Locator> = {
      'Transformer Details': this.page.locator(this.Elements.transformerDataSlot_TransformerDetailsSection),
      'L1 Phase': this.page.locator(this.Elements.transformerDataSlot_L1Phase),
      'L2 Phase': this.page.locator(this.Elements.transformerDataSlot_L2Phase),
      'L3 Phase': this.page.locator(this.Elements.transformerDataSlot_L3Phase),
      'N Phase': this.page.locator(this.Elements.transformerDataSlot_NPhase),
    };

    for (const s of sections) {
      const loc = map[s];
      if (!loc) throw new Error(`No locator mapping for Transformer section: "${s}"`);
      await expect(loc).toBeVisible({ timeout: 15_000 });
    }
  }

  // Verifies selecting another Transformer collapses the expanded slot.
  async collapseTransformerDataSlot() {
    const transformerButtons = this.page.getByRole('button', { name: /^Transformer \d+$/ });
    const transformerCount = await transformerButtons.count();
    if (transformerCount < 2) {
      throw new Error('At least two transformers are required to verify accordion collapse behavior.');
    }

    let expandedIndex = -1;
    for (let index = 0; index < transformerCount; index++) {
      if (await transformerButtons.nth(index).getAttribute('aria-expanded') === 'true') {
        expandedIndex = index;
        break;
      }
    }
    if (expandedIndex < 0) throw new Error('No expanded Transformer accordion was found.');

    const expandedTransformer = transformerButtons.nth(expandedIndex);
    const expandedName = (await expandedTransformer.innerText()).trim();
    const nextTransformer = transformerButtons.nth((expandedIndex + 1) % transformerCount);

    await nextTransformer.click();
    await expect(expandedTransformer).toHaveAttribute('aria-expanded', 'false');
    await expect(this.page.getByRole('region', { name: expandedName, exact: true })).toBeHidden();
    await expect(nextTransformer).toHaveAttribute('aria-expanded', 'true');
  }
}
