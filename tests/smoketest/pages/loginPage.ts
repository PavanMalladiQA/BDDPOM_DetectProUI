import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../wrapper/PlaywrightWrappers";
import testdata from '../hooks/testdata.json';

export default class LoginPage {
    private base: PlaywrightWrapper;
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        usernameInput: "input[name='username']",
        passwordInput: "input[name='password']",
        loginButton: "button[type='submit']",
        landingbannerLogo: "(//a[@role='link'])[1]"
    }

    async navigateToLoginPage() {
        await this.base.goto("/");
    }

    async enterUserName(username: string) {
        await this.page.locator(this.Elements.usernameInput).fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(this.Elements.passwordInput).fill(password);
    }

    async clickLoginButton() {
        await this.page.locator(this.Elements.loginButton).click();
    }

    async loginUser(username: string, password: string) {
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async checkBannericon() {
        await expect(this.page.locator(this.Elements.landingbannerLogo)).toBeVisible();
    }
}