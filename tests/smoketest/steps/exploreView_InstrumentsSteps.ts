import { createBdd } from 'playwright-bdd';
import { DataTable } from '@cucumber/cucumber';
import { test } from '@playwright/test';
import ExploreViewInstrumentsPage from '../pages/exploreView_InstrumentsPage';

const { When, Then } = createBdd();

function instrumentsPage(page: import('@playwright/test').Page) {
  return new ExploreViewInstrumentsPage(page);
}

When('the user selects the {string} instrument from the Instruments list', async ({ page }, instrument: string) => {
  const available = await instrumentsPage(page).selectInstrument(instrument);
  test.skip(!available, `${instrument} is not commissioned for the selected substation`);
});

Then('the Instruments view should be displayed', async ({ page }) => {
  await instrumentsPage(page).assertInstrumentsViewLoaded();
});

Then('the Instruments view left navigation menu should be visible', async ({ page }) => {
  await instrumentsPage(page).assertLeftNavVisible();
});

Then(
  'the Instruments view left navigation menu should contain {string} with associated {string}',
  async ({ page }, item: string, states: string) => {
    await instrumentsPage(page).assertLeftNavItemState(item, states);
  }
);

Then('the {string} Instrument Overview should contain these fields:', async ({ page }, device: string, fields: DataTable) => {
  await instrumentsPage(page).assertInstrumentOverviewFields(device, fields);
});

Then('the {string} section should contain these fields:', async ({ page }, section: string, fields: DataTable) => {
  await instrumentsPage(page).assertSectionFields(section, fields);
});

Then('the Instruments view should display these graph components:', async ({ page }, graphs: DataTable) => {
  await instrumentsPage(page).assertGraphComponents(graphs);
});
