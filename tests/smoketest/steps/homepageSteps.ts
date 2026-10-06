import { createBdd } from 'playwright-bdd';
import { pageFixture } from '../hooks/pageFixture';
import testdata from '../hooks/testdata.json';

const { Given, When, Then } = createBdd();

Given('the user is on the Detect Pro home screen', async () => {
  await pageFixture.homePage.gotoHome();
  await pageFixture.homePage.assertOnHomeSubCounters();
});

Then('the Instrument counts should be displayed in the banner', async () => {
  await pageFixture.homePage.assertInstrumentCountsVisible();
});

Then('the Home Page left navigation menu should be visible', async () => {
  await pageFixture.homePage.assertLeftNavVisible();
});

Then('the left navigation menu should contain:', async ({}, table) => {
  const items = table.hashes().map((r: any) => r.item);
  await pageFixture.homePage.assertLeftNavContainsItems(items);
});

Then('the view toggles should be visible:', async ({}, table) => {
  const views = table.hashes().map((r: { view: string }) => r.view.trim());
  await pageFixture.homePage.assertViewTogglesVisible(views);
});

Then('the {string} option should be visible', async ({}, label: string) => {
  if (label === 'Clear Filters') return pageFixture.homePage.assertClearFiltersVisible();
  if (label === 'Sort results by') return pageFixture.homePage.assertSortResultsByVisible();
  throw new Error(`No handler for option: ${label}`);
});

// New: "Sort results by" should NOT be visible on Map view
Then('the {string} option should not be visible on Map view', async ({}, label: string) => {
  if (label !== 'Sort results by') throw new Error(`No handler for option: ${label}`);

  // Ensure we are on Map view before asserting hidden
  await pageFixture.homePage.switchToMapView();
  await pageFixture.homePage.assertSortResultsByHidden();
});

Then('the {string} button should be visible', async ({}, label: string) => {
  if (label === 'Refresh') return pageFixture.homePage.assertRefreshVisible();
  if (label === 'Download Substation CSV') return pageFixture.homePage.assertDownloadSubstationCSVVisible();

  // Fix: UI accessible name is "Alarm CSV" (not "Download Alarm CSV")
  if (label === 'Alarm CSV') return pageFixture.homePage.assertAlarmCsvButtonVisible();

  throw new Error(`No handler for button: ${label}`);
});

Then('the {string} timestamp should be displayed', async ({}, label: string) => {
  if (label === 'Last updated') return pageFixture.homePage.assertLastUpdatedVisible();
  throw new Error(`No handler for timestamp: ${label}`);
});

// -------- Substation Filters panel --------

When('the user clicks on the Substation Filters icon', async () => {
  await pageFixture.homePage.openSubstationFiltersPanel();
});

Then('the Substation Filters panel should be visible on the left side', async () => {
  await pageFixture.homePage.assertSubstationFiltersPanelVisible();
});

Then('the Substation Type filter chips should be displayed:', async ({}, table) => {
  const chips = table.hashes().map((r: any) => r.chip);
  await pageFixture.homePage.assertSubstationTypeChipsVisible(chips);
});

Then('the License Area filter should be displayed and clickable', async () => {
  await pageFixture.homePage.assertLicenseAreaDisplayedAndClickable();
});

Then('the District filter should be displayed and disabled by default', async () => {
  await pageFixture.homePage.assertDistrictDisplayedAndDisabled();
});

Then('the Instrument Filters section should be displayed', async () => {
  await pageFixture.homePage.assertInstrumentFiltersSectionVisible();
});

Then('the Instrument Search filter should be displayed', async () => {
  await pageFixture.homePage.assertInstrumentSearchVisible();
});

Then('the Instrument Installed filter chips should be displayed:', async ({}, table) => {
  const chips = table.hashes().map((r: any) => r.chip);
  await pageFixture.homePage.assertInstrumentInstalledChipsVisible(chips);
});

Then('the Instrument Type filter should contain:', async ({}, table) => {
  const options = table.hashes().map((r: any) => r.option);
  await pageFixture.homePage.assertInstrumentTypeOptionsVisible(options);
});

Then('the Offline instruments filter chips should be displayed:', async ({}, table) => {
  const chips = table.hashes().map((r: any) => r.chip);
  await pageFixture.homePage.assertOfflineInstrumentChipsVisible(chips);
});

// -------- Cards / list --------

Then('the substation list should be loaded in grid view', async () => {
  await pageFixture.homePage.assertGridViewLoaded();
});

Then('each substation card should display key fields', async () => {
  await pageFixture.homePage.assertSubstationCardKeyFieldsVisible();
});

Then('the {string} button should be available on each substation card', async ({}, label: string) => {
  if (label === 'Quick view') return pageFixture.homePage.assertQuickViewAvailableOnCards();
  if (label === 'Explore') return pageFixture.homePage.assertExploreAvailableOnCards();
  throw new Error(`No handler for card button: ${label}`);
});

// -------- View toggles --------

// Existing steps used by other scenarios
When('the user clicks on the Map view icon', async () => {
  await pageFixture.homePage.clickMapView();
});

Then('the map view canvas should be displayed', async () => {
  await pageFixture.homePage.assertMapViewVisible();
});

When('the user clicks on the Table view icon', async () => {
  await pageFixture.homePage.clickTableView();
});

Then('the table view canvas should be displayed', async () => {
  await pageFixture.homePage.assertTableViewVisible();
});

// New steps matching revised feature text
When('I switch to Grid view', async () => {
  await pageFixture.homePage.switchToGridView();
});

When('I switch to Table view', async () => {
  await pageFixture.homePage.switchToTableView();
});

// -------- Panels & navigation --------

When('the user clicks on {string} in the left navigation menu', async ({}, label: string) => {
  await pageFixture.homePage.clickLeftNavItem(label);
});

Then('the App suite panel should be visible', async () => {
  await pageFixture.homePage.assertAppSuitePanelVisible();
});

Then('the {string} App suite option should be visible', async ({}, label: string) => {
  if (label === 'Alarm CSV') return pageFixture.homePage.assertAlarmCsvOptionVisible();
  throw new Error(`No handler for option: ${label}`);
});

Then('the Circuit Condition panel should be visible', async () => {
  await pageFixture.homePage.assertCircuitConditionPanelVisible();
});

// -------- Quick view & Explore actions --------

When('the user clicks on the {string} button on the substation under test', async ({}, arg: string) => {
  // These methods should ensure Grid view / cards are ready (recommended in HomePage)
  if (arg === 'Quick view') return pageFixture.homePage.clickQuickViewOnSubstation(testdata.substation_name);
  throw new Error(`No handler for substation card click: ${arg}`);
});

Then('the Quick view panel should be displayed', async () => {
  await pageFixture.homePage.assertQuickViewPanelVisible();
});

When('the user clicks on the {string} button in quick view', async ({}, arg: string) => {
  if (arg !== 'Explore') throw new Error(`No handler for substation card click: ${arg}`);

  // Click Explore (which navigates / updates route)
  await pageFixture.homePage.clickExploreInQuickView();

  // Now wait until Explore Overview is actually loaded
  await pageFixture.exploreView_SubstationOverviewPage.assertSubstationOverviewLoaded();
});

Then('the user should be navigated to the Substation details page', async () => {
  await pageFixture.homePage.assertNavigatedToSubstationDetails();
});
