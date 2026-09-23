import { createBdd } from 'playwright-bdd';
import { pageFixture } from '../hooks/pageFixture';
import { DataTable } from '@cucumber/cucumber';

const { Given, When, Then } = createBdd();

// ---------------- Background / Navigation ----------------

Given(
  'the user is on Detect Pro Substation Overview screen for substation under test',
  async ({}) => {
    await pageFixture.homePage.gotoHome();
    await pageFixture.homePage.assertOnHomeSubCounters();

    await pageFixture.homePage.switchToGridView();
    await pageFixture.homePage.clickExploreOnFirstCard();
    
    await pageFixture.exploreView_SubstationOverviewPage.assertSubstationOverviewLoaded();
  }
);

// ---------------- Left Navigation ----------------

Then('the Substation Overview left navigation menu should be visible', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.assertLeftNavVisible();
});

Then(
  'the Substation Overview left navigation menu should contain {string} with associated {string}',
  async ({}, item: string, states: string) => {
    await pageFixture.exploreView_SubstationOverviewPage.assertLeftNavItemState(item, states);
  }
);

// ---------------- Fault Filters / Chart Filters ----------------

Then('the Substation Overview screen should load successfully', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.assertSubstationOverviewLoaded();
});

When('the Chart Filters icon selected', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.openChartFilters();
});

Then('the Fault Filters panel should be visible', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.assertFaultFiltersPanelVisible();
});

Then(
  'Instrument Dropdown field should be visible provided selected substation has multiple instruments',
  async ({}) => {
    await pageFixture.exploreView_SubstationOverviewPage.assertInstrumentDropdownVisibleIfPresent();
  }
);

Then('the Instrument Dropdown should be clickable', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.assertInstrumentDropdownClickableIfPresent();
});

Then(
  'the Fault Filters should contain Time Period filter with {string}',
  async ({}, option: string) => {
    await pageFixture.exploreView_SubstationOverviewPage.assertAllTimePeriodOptions(option);
  }
);

// ---------------- Substation Details data slot ----------------

Then('the data slot for Substation should be visible', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.assertSubstationDataSlotVisible();
});

When('user expands the Substation data slot', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.expandSubstationDataSlot();
});

Then('the following section headers should be displayed:', async ({}, dataTable: DataTable) => {
  // table has a header row like: | section headers |
  const headers: string[] = dataTable.raw().slice(1).map((r: string[]) => r[0]);
  await pageFixture.exploreView_SubstationOverviewPage.assertSubstationSectionHeaders(headers);
});

Then('user should be able to collapse the Substation data slot', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.collapseSubstationDataSlot();
});

// ---------------- Notes & Images data slot ----------------

When('user expands Substation Notes and Images data slot', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.expandNotesAndImagesDataSlot();
});

Then(
  'the following section headers for notes and images should be displayed:',
  async ({}, dataTable: DataTable) => {
    const headers: string[] = dataTable.raw().slice(1).map((r: string[]) => r[0]);
    await pageFixture.exploreView_SubstationOverviewPage.assertNotesAndImagesSectionHeaders(headers);
  }
);

Then('user should be able to collapse the Substation Notes and Images data slot', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.collapseNotesAndImagesDataSlot();
});

// ---------------- Transformer data slot ----------------

When('user expands Transformer data slot', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.expandTransformerDataSlot();
});

Then('the following sections should be displayed:', async ({}, dataTable: DataTable) => {
  const sections: string[] = dataTable.raw().slice(1).map((r: string[]) => r[0]);
  await pageFixture.exploreView_SubstationOverviewPage.assertTransformerSections(sections);
});

Then('user should be able to collapse the Transformer data slot', async ({}) => {
  await pageFixture.exploreView_SubstationOverviewPage.collapseTransformerDataSlot();
});