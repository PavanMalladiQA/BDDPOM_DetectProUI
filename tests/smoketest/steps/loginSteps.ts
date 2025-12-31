import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from "../hooks/pageFixture";
import testdata from '../hooks/testdata.json';
//import loginPage from '../pages/loginPage';

setDefaultTimeout(60 * 1000 * 2);

Given('the user navigates to URL', async function () {
    await fixture.page.goto(process.env.BASEURL || 'https://detectpro.sub360test.co.uk/en');    
         });
         
When('the user enters a valid username {string} and password {string}', async function (username, password) {
    await this.base.loginPage.enterUserName(username);
    await this.base.loginPage.enterPassword(password);
       
         });

When('clicks the login button', async function () {
    await this.base.loginPage.clickLoginButton();  
         });

Then('the user should be successfully navigated to Landing Page', async function () {
    await this.base.loginPage.checkBannericon();
    //const homeLogo = fixture.page.locator("(//button[contains(@class,'z-0 group')])[3]");
    //await expect(homeLogo).toBeDisabled();      
         });

