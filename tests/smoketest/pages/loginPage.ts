import { Page } from "@playwright/test";

export default class LoginPage {
    
    // Stores the browser page used by this page object.
    constructor(private page: Page) {}

    private Elements = {
        usernameInput: "input[name='username']",
        passwordInput: "input[name='password']",
        loginButton: "button[type='submit']",
        landingbannerLogo: "(//a[@role='link'])[1]",
    };

    // Opens the login route.
    async navigateToLoginPage() {
        await this.page.goto("./"); // baseURL already includes /en
    }

    // Enters a username after its input becomes visible.
    async enterUserName(username: string) {
        const user = await this.page.locator(this.Elements.usernameInput);
        await user.waitFor({ state: 'visible', timeout: 15_000 });
        await user.fill(username);
    }

    // Enters the account password.
    async enterPassword(password: string) {
        await this.page.locator(this.Elements.passwordInput).fill(password);
    }

    // Submits the login form.
    async clickLoginButton() {
        await this.page.locator(this.Elements.loginButton).click();
    }

    // Completes the login flow using the supplied credentials.
    async loginUser(username: string, password: string) {
        await this.navigateToLoginPage();
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

}