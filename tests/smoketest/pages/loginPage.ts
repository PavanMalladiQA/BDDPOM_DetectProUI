import { Page } from "@playwright/test";

export default class LoginPage {
    
    constructor(private page: Page) {}

    private Elements = {
        usernameInput: "input[name='username']",
        passwordInput: "input[name='password']",
        loginButton: "button[type='submit']",
        landingbannerLogo: "(//a[@role='link'])[1]",
    };

    async navigateToLoginPage() {
        await this.page.goto("./"); // baseURL already includes /en
    }

    async enterUserName(username: string) {
        const user = await this.page.locator(this.Elements.usernameInput);
        await user.waitFor({ state: 'visible', timeout: 15_000 });
        await user.fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(this.Elements.passwordInput).fill(password);
    }

    async clickLoginButton() {
        await this.page.locator(this.Elements.loginButton).click();
    }

    async loginUser(username: string, password: string) {
        await this.navigateToLoginPage();
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

}