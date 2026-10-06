import { Page } from "@playwright/test";

export default class PlaywrightWrapper {

    // Stores the Playwright page used by wrapper actions.
    constructor(private page: Page) { }

    // Navigates to a URL and waits for DOM content to load.
    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }

    // Waits for a locator to become visible, then clicks it.
    async waitAndClick(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible"
        });
        await element.click();
    }


}