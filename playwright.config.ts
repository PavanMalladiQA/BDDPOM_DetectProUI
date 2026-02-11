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


  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
  /*  Base URL to use in actions like `await page.goto('')`. */
  baseURL: process.env.BASEURL ?? 'https://detectpro.sub360test.co.uk/en',
    
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    { 
      name: 'setup', 
      testDir: 'tests/setup', // include the auth setup file as a step to ensure it runs before tests',
      testMatch: /auth\.setup\.ts/, 
      use: { 
        ...devices['Desktop Chrome']
      },
    },
      // Landing scenarios need auth
    {
        name: 'chromium-auth',
        dependencies: ['setup'],
        testMatch: /[\\/]features[\\/]landing\.feature\.spec\.(js|ts)$/,
        use: {
          ...devices['Desktop Chrome'],
          storageState: 'playwright/.auth/state.json',
        },
      },

     // Login scenarios must NOT use storageState
      {
        name: 'chromium-noauth',
        testMatch: /[\\/]features[\\/]login\.feature\.spec\.(js|ts)$/,
        use: { ...devices['Desktop Chrome'] 
          
        },
      },
    
  ],
});
