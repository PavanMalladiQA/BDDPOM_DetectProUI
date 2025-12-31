import { BeforeAll, AfterAll, Before, After, Status, AfterStep } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import LoginPage from "../pages/loginPage";

let browser: Browser;
let context: BrowserContext;

BeforeAll( async function () {
    browser = await chromium.launch({ headless: false });
});

Before( async function () {
    context = await browser.newContext();
    const page = await context.newPage();
    fixture.page = page;
    this.base = { loginPage: new LoginPage(page) };
});

/*
After( async function ({pickle, result}) {
    console.log(result?.status);
    //screenshot on failure
    if (result?.status == Status.FAILED) {
        const screenshot = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: 'png' });
        await this.attach(screenshot, 'image/png');
    }
    await fixture.page.close();
    await context.close();
});

AfterAll( async () => {
    await browser.close();
}); 
*/