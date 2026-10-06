import { createBdd } from 'playwright-bdd';
import ExploreViewTabsPage from '../pages/exploreView_TabsPage';
import { pageFixture } from '../hooks/pageFixture';

const { When, Then } = createBdd();

When(
  'the user selects the {string} tab',
  async ({ page }, tab: string) => {
    await new ExploreViewTabsPage(page).selectTab(tab);
  }
);

Then(
  'the {string} tab should be displayed as selected',
  async ({ page }, tab: string) => {
    await new ExploreViewTabsPage(page).assertTabSelected(tab);
  }
);

Then(
  'the user should be navigated to the {string} view',
  async ({ page }, expectedView: string) => {
    await new ExploreViewTabsPage(page).assertExpectedView(expectedView);
  }
);

Then(
  'a screenshot should be captured showing the selected {string} tab',
  async ({ page }, tab: string) => {
    await new ExploreViewTabsPage(page).captureSelectedTabScreenshot(tab);
  }
);