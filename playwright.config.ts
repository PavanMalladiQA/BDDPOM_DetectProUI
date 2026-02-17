import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: ['tests/smoketest/features/**/*.feature'],
  steps: [
    'tests/smoketest/steps/**/*.ts',
    'tests/smoketest/hooks/**/*.ts', // ensures hooks are loaded even if `hooks:` isn’t supported
  ],
});

export default defineConfig({
  testDir, // ✅ IMPORTANT: run generated BDD tests


  //grep: /@smoke/, //only run tests with @smoke tag
  //grep: /@regression/, //only run tests with @regression tag
  //(?=@smoke)(?=@regression)  //run tests with both @smoke and @regression tags
  //grep: /@smoke|@regression/, //run tests with either @smoke or @regression tags


   fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',

  use: {
    baseURL: process.env.BASEURL ?? 'https://detectpro.sub360test.co.uk/en',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    // 1) Create logged-in storage state
    {
      name: 'setup-auth',
      testDir: 'tests/setup',
      testMatch: /auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // 2) Select customer and save customer-selected state
    {
      name: 'setup-customer',
      testDir: 'tests/setup',
      testMatch: /customer\.setup\.ts/,
      dependencies: ['setup-auth'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/state.json',
      },
    },

    // Landing tests: need login state only
    {
      name: 'landing',
      dependencies: ['setup-auth'],
      testMatch: /[\\/]features[\\/]landing\.feature\.spec\.(js|ts)$/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/state.json',
      },
    },

    // Home tests: need login + customer selected
    {
      name: 'home',
      dependencies: ['setup-customer'],
      testMatch: /[\\/]features[\\/]home\.feature\.spec\.(js|ts)$/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/customer.json',
      },
    },

    // Login feature: must NOT use storageState
    {
      name: 'login',
      testMatch: /[\\/]features[\\/]login\.feature\.spec\.(js|ts)$/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});