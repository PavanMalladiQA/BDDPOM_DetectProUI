import { createBdd } from 'playwright-bdd';
import { test } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture';
import testdata from '../hooks/testdata.json';

const { Given, When, Then } = createBdd();

Given('the user is on Detect Pro Electrical Explore View for substation under test', async () => {
  await pageFixture.homePage.gotoHome();
  await pageFixture.homePage.assertOnHomeSubCounters();
  await pageFixture.homePage.switchToGridView();
  await pageFixture.homePage.clickExploreOnSubstation(testdata.substation_name);
  await pageFixture.exploreView_SubstationOverviewPage.assertSubstationOverviewLoaded();
  await pageFixture.exploreView_ElectricalPage.selectElectricalTab();
});

Then('the Electrical tab should be selected', async () =>
  pageFixture.exploreView_ElectricalPage.assertElectricalTabSelected());

Then('the Chart Filters panel should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertChartFiltersVisible());

Then('the Electrical chart title should contain the selected substation and transformer', async () =>
  pageFixture.exploreView_ElectricalPage.assertChartTitle());

Then('the Electrical chart should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertChartVisible());

Then('the Transformer dropdown should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertControlVisible('Transformer'));

Then('the Instrument dropdown should be visible', async () => {
  const electricalPage = pageFixture.exploreView_ElectricalPage;
  test.skip(
    !(await electricalPage.isControlAvailable('Instrument')),
    'The selected substation has no Electrical instrument filter.'
  );
  await electricalPage.assertControlVisible('Instrument');
});

Then('the Time Period dropdown should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertControlVisible('Time Period'));

Then('the Asset section should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertSectionVisible('Asset'));

Then('the Data Point Type section should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertSectionVisible('Data Point Type'));

Then('the Phase section should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertSectionVisible('Phase'));

Then(
  'the Explore View tab {string} should be visible',
  async ({}, tab: string) =>
    pageFixture.exploreView_ElectricalPage.assertExploreTabVisible(tab)
);
Then(
  'the Explore View tab {string} should be enabled',
  async ({}, tab: string) =>
    pageFixture.exploreView_ElectricalPage.assertExploreTabEnabled(tab)
);

When('the user opens the Transformer dropdown', async () =>
  pageFixture.exploreView_ElectricalPage.openDropdown('Transformer'));
Then('the Transformer dropdown options should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertDropdownOptionsVisible());
Then('the Transformer dropdown should contain the selected transformer', async () =>
  pageFixture.exploreView_ElectricalPage.assertDropdownContains('Transformer'));
When('the user selects the first transformer', async () =>
  pageFixture.exploreView_ElectricalPage.selectFirstDropdownOption());
Then('the selected transformer should be displayed in the Transformer dropdown', async () =>
  pageFixture.exploreView_ElectricalPage.assertSelectedDropdown('Transformer'));

When('the user opens the Instrument dropdown', async () => {
  const electricalPage = pageFixture.exploreView_ElectricalPage;
  test.skip(
    !(await electricalPage.isControlAvailable('Instrument')),
    'The selected substation has no Electrical instrument filter.'
  );
  await electricalPage.openDropdown('Instrument');
});
Then('the Instrument dropdown options should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertDropdownOptionsVisible());
When('the user selects an available instrument', async () =>
  pageFixture.exploreView_ElectricalPage.selectAvailableInstrument());
Then('the selected instrument should be displayed in the Instrument dropdown', async () =>
  pageFixture.exploreView_ElectricalPage.assertSelectedDropdown('Instrument'));
Then('the Electrical chart should refresh for the selected instrument', async () =>
  pageFixture.exploreView_ElectricalPage.assertChartRefreshed());

When('the user opens the Time Period dropdown', async () =>
  pageFixture.exploreView_ElectricalPage.openDropdown('Time Period'));
Then('the Time Period dropdown should contain {string}', async ({}, option: string) =>
  pageFixture.exploreView_ElectricalPage.assertDropdownContains(option));
When('the user selects Time Period {string}', async ({}, option: string) =>
  pageFixture.exploreView_ElectricalPage.selectTimePeriod(option));
Then('Time Period {string} should be displayed as selected', async ({}, option: string) =>
  pageFixture.exploreView_ElectricalPage.assertTimePeriodSelected(option));
Then('the Electrical chart should refresh', async () =>
  pageFixture.exploreView_ElectricalPage.assertChartRefreshed());

Then('the Asset section should contain {string}', async ({}, asset: string) =>
  pageFixture.exploreView_ElectricalPage.assertAssetContains(asset));
When('the user selects asset {string}', async ({}, asset: string) =>
  pageFixture.exploreView_ElectricalPage.selectAsset(asset));
Then('asset {string} should be selected', async ({}, asset: string) =>
  pageFixture.exploreView_ElectricalPage.assertAssetSelected(asset));
Then('the asset chips should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertAssetChipsVisible());

Then('the Electrical chart should remain visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertChartVisible());
Then('the chart should display {string} when no readings exist', async () =>
  pageFixture.exploreView_ElectricalPage.assertNoDataState());
Then('the chart should not display a broken component error', async () =>
  pageFixture.exploreView_ElectricalPage.assertNoDataState());

Then('the Substation Overview tab should be selected', async () =>
  pageFixture.exploreView_ElectricalPage.assertOverviewSelected());

When('the user selects the Home breadcrumb', async () =>
  pageFixture.exploreView_ElectricalPage.clickHomeBreadcrumb());
Then('the Detect Pro Home screen should be displayed', async () =>
  pageFixture.exploreView_ElectricalPage.assertHomeDisplayed());
Then('the Home view options should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertHomeDisplayed());

Then('the footer link {string} should be visible', async ({}, link: string) =>
  pageFixture.exploreView_ElectricalPage.assertFooterLink(link));
Then('the footer link {string} should be enabled', async ({}, link: string) =>
  pageFixture.exploreView_ElectricalPage.assertFooterLinkEnabled(link));

Then('the Electrical view left navigation menu should be visible', async () =>
  pageFixture.exploreView_ElectricalPage.assertLeftNavVisible());
Then(
  'the Electrical view left navigation menu should contain {string} with associated {string}',
  async ({}, item: string, states: string) =>
    pageFixture.exploreView_ElectricalPage.assertLeftNavItemState(item, states)
);