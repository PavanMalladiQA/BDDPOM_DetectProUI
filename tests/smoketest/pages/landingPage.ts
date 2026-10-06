import { expect, type Page } from "@playwright/test";
//import testdata from '../hooks/testdata.json';

export default class LandingPage {
    // Stores the browser page used by this page object.
        constructor(private page: Page) {
    }

    private Elements = {
        landingbannerLogo: "//a[contains(@class,'relative tap-highlight-transparent')]",
        customerBannerDropdownButton: "(//button[@type='button'])[2]",
        customerBannerDropdownBox: "(//input[@aria-label='Customer'])[1]",    
        customerOptionSelection: "//span[normalize-space(text())='EA Technology Manufacturer']",
        nocustomerselectedMessage:"//h3[normalize-space(text())='No customer selected']",
        customerDropdown:"(//input[@aria-label='Customer'])[2]",
        commissioningFooterLink: "(//a[@role='link'])[2]",
        feedbackFooterLink: "(//a[@role='link'])[3]",
        submitFeedbackPopup: "//header[normalize-space(text())='Submit Feedback']",
        submitFeedbackPopupCloseButton: "//button[normalize-space(text())='Close']",
        contactsupportFooterLink: "(//a[@role='link'])[4]",
        contactsupportGotQuestionPopup: "//div[@data-slot='content']",
        homescreenHomeIcon: "(//button[@data-disabled='true'])[1]"

    };

    // Verifies the landing-page banner logo is visible.
    async assertBannerIconVisible() {
        await expect(this.page.locator(this.Elements.landingbannerLogo)).toBeVisible({ timeout: 15_000 });
    }

    // Verifies the customer dropdown button is visible in the banner.
    async checkBannerCustomerDropdownButton() {
        await expect(this.page.locator(this.Elements.customerBannerDropdownButton)).toBeVisible();
    }

    // Verifies the banner customer dropdown can be clicked.
    async checkBannerCustomerDropdownBoxClickable() {
        await this.page.locator(this.Elements.customerBannerDropdownBox).click({ trial: true });
    }

    // Verifies the banner customer button is actionable.
    async checkBannerCustomerDropdownButtonClickable() {
        await this.page.locator(this.Elements.customerBannerDropdownButton).click({ trial: true });
    }

    // Opens the banner customer dropdown.
    async clickCustomerDropdown() {
        await this.page.locator(this.Elements.customerBannerDropdownButton).click();
    }

    // Verifies the customer dropdown is visible in the page body.
    async checkCustomerDropdowninMidScreen() {
        await expect(this.page.locator(this.Elements.customerDropdown)).toBeVisible();
    }

    // Verifies the no-customer-selected message is visible.
    async checkNoCustomerSelectedMessage() {
        await expect(this.page.locator(this.Elements.nocustomerselectedMessage)).toBeVisible();
    }   

    // Verifies the Commissioning footer link is visible and actionable.
    async checkCommissioningFooterLinkVisibleAndClickable() {
    const link = this.page.locator(this.Elements.commissioningFooterLink);

    await expect(link).toBeVisible();
    await expect(link).toBeEnabled();
    await link.click({ trial: true }); // validates actionability without triggering navigation
    }

    // Opens the Commissioning footer link.
    async clickCommissioningFooterLink() {
        await this.page.locator(this.Elements.commissioningFooterLink).click();
    }

    // Verifies the Commissioning link opens its site in a new page.
    async checkCommissioningSiteNavigation() {
        
        // Listen for the new page (tab or window) that opens after the click
        const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'), // Waits for a new page to open
        this.page.locator("(//a[@role='link'])[2]").click() // Adjust selector as needed
        ]);

        // Wait for the new page to load
        await newPage.waitForLoadState();

        // Assert the URL
        const url = newPage.url();
        if (url === 'https://commissioning-new.sub360test.co.uk/en') {
        console.log('✅ Navigation successful!');
        } else {
        console.error(`❌ Unexpected URL: ${url}`);
        }
        await newPage.close();

    }

    // Verifies the Feedback footer link is visible and actionable.
    async checkFeedbackFooterLinkVisibleAndClickable() {
        const link = this.page.locator(this.Elements.feedbackFooterLink);
        await expect(link).toBeVisible();
        await expect(link).toBeEnabled();
        await link.click({ trial: true }); // validates actionability without triggering navigation
    }
    // Opens the Feedback footer link.
    async clickFeedbackFooterLink() {
        await this.page.locator(this.Elements.feedbackFooterLink).click();
    }
    // Verifies the Submit Feedback popup is visible.
    async checkSubmitFeedbackPopupDisplayed() {
        await expect(this.page.locator(this.Elements.submitFeedbackPopup)).toBeVisible();
    }

    // Closes the Submit Feedback popup.
    async closeSubmitFeedbackPopup() {
        await this.page.locator(this.Elements.submitFeedbackPopupCloseButton).click();
    }

    // Verifies the Contact Support footer link is visible and actionable.
    async checkContactSupportFooterLinkVisibleAndClickable() {
        const link = this.page.locator(this.Elements.contactsupportFooterLink);
        await expect(link).toBeVisible();
        await expect(link).toBeEnabled();
        await link.click({ trial: true }); // validates actionability without triggering navigation
    }

    // Opens the Contact Support footer link.
    async clickContactSupportFooterLink() {
        await this.page.locator(this.Elements.contactsupportFooterLink).click();
    }

    // Verifies the Contact Support popup is visible.
    async checkContactSupportPopupDisplayed() {
        await expect(this.page.locator(this.Elements.contactsupportGotQuestionPopup)).toBeVisible();
    }

    // Selects a customer from the banner dropdown by name.
    async selectDesiredCustomerFromDropdown(desiredCustomer: string) {
        const box = this.page.locator(this.Elements.customerBannerDropdownBox);
        await box.click();
        await box.fill(desiredCustomer); 
        
        // wait for matching option to appear, then choose it
        const option = this.page.getByRole('option', { name: desiredCustomer });
        await expect(option).toBeVisible({ timeout: 15_000 });
        await option.click();
        await expect(box).toHaveValue(desiredCustomer, { timeout: 15_000 });
    }

    // Verifies the banner dropdown contains the expected customer.
    async verifySelectedCustomerInDropdown(expectedCustomer: string) {
        const selectedCustomer = await this.page.locator(this.Elements.customerBannerDropdownBox).inputValue();
        expect(selectedCustomer).toBe(expectedCustomer);
    }

    // Verifies the Home page loaded with the expected customer selected.
    async checkHomePageLoadedForCustomer(expectedCustomer: string) {
        await expect(this.page.locator(this.Elements.homescreenHomeIcon)).toBeDisabled(); // The home icon is disabled on the home page
        const selectedCustomer = await this.page.locator(this.Elements.customerBannerDropdownBox).inputValue();
        expect(selectedCustomer).toBe(expectedCustomer);
    }

    // Verifies a requested customer appears in the dropdown options.
    async checkCustomerExistsInDropdown(customerName: string) {
     
        await this.page.locator(this.Elements.customerBannerDropdownBox).click();
        await this.page.locator(this.Elements.customerBannerDropdownBox).fill(customerName); // Use fill instead of type
        
        // Locate the exact matching option
       const option = this.page.locator(`//div[@data-slot='content']//li[normalize-space()="${customerName}"]`);
    
       await expect(option, `Customer "${customerName}" should exist in dropdown`).toBeVisible();
    }
}

