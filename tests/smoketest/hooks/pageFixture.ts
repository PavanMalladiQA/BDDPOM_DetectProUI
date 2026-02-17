// pageFixture.ts
import type { Page } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import LandingPage from '../pages/landingPage';
import HomePage from '../pages/homePage';
  
class PageFixture {
  private _page?: Page;
  private _loginPage?: LoginPage;
  private _landingPage?: LandingPage;
  private _homePage?: HomePage;

  init(page: Page) {
    this._page = page;
    this._loginPage = new LoginPage(page);
    this._landingPage = new LandingPage(page);
    this._homePage = new HomePage(page);
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

  get homePage(): HomePage {
    if (!this._homePage) throw new Error('pageFixture.homePage used before init(page)');
    return this._homePage;
  }
  
}

export const pageFixture = new PageFixture();
