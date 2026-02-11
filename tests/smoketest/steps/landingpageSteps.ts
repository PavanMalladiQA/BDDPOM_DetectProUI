import { createBdd } from 'playwright-bdd';
import { pageFixture } from "../hooks/pageFixture";

const { Given, When, Then } = createBdd();

//Background step for landing page related scenarios
Given('the user navigates to the Detect Pro landing page', async ({page}) => {
   // baseURL includes /en, so './' keeps you under that
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    console.log('URL after goto:', page.url());
    await pageFixture.landingPage.assertBannerIconVisible();
});

//Scenario: Verify the customer dropdown in the banner is visible and functional
Then('the customer dropdown should be visible in the banner', async () => {
    await pageFixture.landingPage.checkBannerCustomerDropdownButton();
});
Then('the dropdown should be clickable', async () => {
    await pageFixture.landingPage.checkBannerCustomerDropdownButtonClickable();
});

//Scenario: Verify the customer dropdown in the middle of the Landing page is visible and functional
Then('the customer dropdown should be visible in the middle of the page', async () => {
    await pageFixture.landingPage.checkCustomerDropdowninMidScreen();
});
Then('the message "No customer selected" should be shown', async () => {
    await pageFixture.landingPage.checkNoCustomerSelectedMessage();
});

//Scenario: Verify Commissioning link is available and functional
Then('the "Commissioning" link should be visible', async () => {
    await pageFixture.landingPage.checkCommissioningFooterLinkVisibleAndClickable();
});
When('the user clicks on the "Commissioning" link', async () => {
    await pageFixture.landingPage.clickCommissioningFooterLink();
});
Then('the UI control to navigate to new page with commissioning UI login page should be presented', async () => {
    await pageFixture.landingPage.checkCommissioningSiteNavigation();
});

//Scenario: Verify Feedback link is available and functional
Then('the "Feedback" link should be visible', async () => {
    await pageFixture.landingPage.checkFeedbackFooterLinkVisibleAndClickable();
});
When('the user clicks on the "Feedback" link', async () => {
    await pageFixture.landingPage.clickFeedbackFooterLink();
});
Then('the Submit Feedback popup should be presented as expected', async () => {
    await pageFixture.landingPage.checkSubmitFeedbackPopupDisplayed();
});

//Scenario: Verify Contact Support link is available and functional
Then('the "Contact Support" link should be visible', async () => {
    await pageFixture.landingPage.checkContactSupportFooterLinkVisibleAndClickable();
});
When('the user clicks on the "Contact Support" link', async () => {
    await pageFixture.landingPage.clickContactSupportFooterLink();
});
Then(/^the "Got a question or need help\?" Contact card should be presented$/, async () => {
    await pageFixture.landingPage.checkContactSupportPopupDisplayed();
});

//Scenario Outline: Validate different customer if present in the combo box in the banner
When('the user clicks banner customer dropdown', async () => {
    await pageFixture.landingPage.checkBannerCustomerDropdownBoxClickable();
});
Then('the application should display {string} in the dropdown', async ({}, customerName: string) => {
    await pageFixture.landingPage.checkCustomerExistsInDropdown(customerName);
});

//Scenario: Verify that the user can select a customer
When('the user clicks on the customer dropdown', async () => {
    await pageFixture.landingPage.clickCustomerDropdown();
});
When('selects a customer from the list', async () => {
    await pageFixture.landingPage.selectDesiredCustomerFromDropdown("EA Technology Manufacturer");
});
Then('the selected customer should be displayed in the dropdown', async () => {
    await pageFixture.landingPage.verifySelectedCustomerInDropdown("EA Technology Manufacturer");
});
Then('the application should load the Home page for the selected customer', async () => {
    await pageFixture.landingPage.checkHomePageLoadedForCustomer("EA Technology Manufacturer");
});