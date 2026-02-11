import { createBdd } from 'playwright-bdd';
import { pageFixture } from "../hooks/pageFixture";

const { Given, When, Then } = createBdd();

Given('the user navigates to URL', async ({page}) => {
     await page.goto('./'); // resolves under baseURL (includes /en)    
});
         
When('the user enters a valid username {string} and password {string}', async ({}, username: string, password: string) => {
    await pageFixture.loginPage.enterUserName(username);
    await pageFixture.loginPage.enterPassword(password);
});

When('clicks the login button', async () => {
    await pageFixture.loginPage.clickLoginButton();  
});

Then('the user should be successfully navigated to Landing Page', async () => {
    await pageFixture.landingPage.assertBannerIconVisible();
});
