// pageFixture.ts
import type { Page } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import LandingPage from '../pages/landingPage';
import HomePage from '../pages/homePage';
import ExploreView_SubstationOverviewPage from '../pages/exploreView_SubstationOverviewPage';
import ExploreView_ElectricalPage from '../pages/exploreView_ElectricalPage';
  
class PageFixture {
  private _page?: Page;
  private _loginPage?: LoginPage;
  private _landingPage?: LandingPage;
  private _homePage?: HomePage;
  private _exploreView_SubstationOverviewPage?: ExploreView_SubstationOverviewPage;
  private _exploreView_ElectricalPage?: ExploreView_ElectricalPage;

  // Initializes page objects for the current Playwright page.
  init(page: Page) {
    this._page = page;
    this._loginPage = new LoginPage(page);
    this._landingPage = new LandingPage(page);
    this._homePage = new HomePage(page);
    this._exploreView_SubstationOverviewPage = new ExploreView_SubstationOverviewPage(page);
    this._exploreView_ElectricalPage = new ExploreView_ElectricalPage(page);
    return this;
  }

  // Returns the initialized Playwright page.
  get page(): Page {
    if (!this._page) throw new Error('pageFixture.page used before init(page)');
    return this._page;
  }

  // Returns the initialized Login page object.
  get loginPage(): LoginPage {
    if (!this._loginPage) throw new Error('pageFixture.loginPage used before init(page)');
    return this._loginPage;
  }

  // Returns the initialized Landing page object.
  get landingPage(): LandingPage {
    if (!this._landingPage) throw new Error('pageFixture.landingPage used before init(page)');
    return this._landingPage;
  }

  // Returns the initialized Home page object.
  get homePage(): HomePage {
    if (!this._homePage) throw new Error('pageFixture.homePage used before init(page)');
    return this._homePage;
  }

  // Returns the initialized Substation Overview page object.
  get exploreView_SubstationOverviewPage(): ExploreView_SubstationOverviewPage {
    if (!this._exploreView_SubstationOverviewPage) throw new Error('pageFixture.exploreView_SubstationOverviewPage used before init(page)');
    return this._exploreView_SubstationOverviewPage;
  }

  // Returns the initialized Electrical page object.
  get exploreView_ElectricalPage(): ExploreView_ElectricalPage {
    if (!this._exploreView_ElectricalPage) throw new Error('pageFixture.exploreView_ElectricalPage used before init(page)');
    return this._exploreView_ElectricalPage;
  }
  
}

export const pageFixture = new PageFixture();
