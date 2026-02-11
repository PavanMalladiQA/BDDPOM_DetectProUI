// pageFixture.ts
import type { Page } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import LandingPage from '../pages/landingPage';

class PageFixture {
  private _page?: Page;
  private _loginPage?: LoginPage;
  private _landingPage?: LandingPage;

  init(page: Page) {
    this._page = page;
    this._loginPage = new LoginPage(page);
    this._landingPage = new LandingPage(page);
  }

  get page(): Page {
    if (!this._page) throw new Error('pageFixture.page used before init(page)');
    return this._page;
  }

  get loginPage(): LoginPage {
    if (!this._loginPage) throw new Error('pageFixture.loginPage used before init(page)');
    return this._loginPage;
  }

  get landingPage(): LandingPage {
    if (!this._landingPage) throw new Error('pageFixture.landingPage used before init(page)');
    return this._landingPage;
  }
}

export const pageFixture = new PageFixture();
