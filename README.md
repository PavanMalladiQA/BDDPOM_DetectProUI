# DetectPro Smoke Tests

This repository contains browser-based smoke tests for the DetectPro web application. Tests are written as Cucumber-style `.feature` files and run with Playwright through `playwright-bdd`.

## What the Tests Cover

The smoke suite checks:

- Login and the landing page
- Home page, customer selection, and substation search
- Substation Overview and its data sections
- Electrical filters and chart behavior
- Explore View tabs
- Instrument details and graphs

The feature files are in `tests/smoketest/features`. Page-object methods and browser locators are in `tests/smoketest/pages`; the matching BDD step implementations are in `tests/smoketest/steps`.

## Prerequisites

- Node.js 22 or later
- npm
- Access to the DetectPro test environment
- A valid test account and a customer/substation available to that account

## Set Up a Local Clone

1. Clone the repository and open its root folder:

   ```powershell
   git clone <repository-url>
   cd DetectPro_smoke
   ```

2. Install the locked dependencies:

   ```powershell
   npm ci
   ```

3. Install the Playwright Chromium browser:

   ```powershell
   npx playwright install chromium
   ```

4. Update `tests/smoketest/hooks/testdata.json` with non-secret test configuration:

   ```json
   {
     "base_url": "https://detectpro.sub360test.co.uk/en",
     "customer_name": "EA Technology Manufacturer",
     "substation_name": "PMQA Great Ancoats Street 4"
   }
   ```

   Use a substation name visible in the Home page results. Customer and substation names must be available to the test account. `playwright.config.ts` and the setup flows read these values from this file.

5. Create a local `.env` file (never committed — see `.gitignore`) from the provided template and fill in a dedicated non-production test account:

   ```powershell
   Copy-Item .env.example .env
   ```

   ```env
   LOGIN_USERNAME=your-test-username
   LOGIN_PASSWORD=your-test-password
   ```

   Credentials are loaded from environment variables via `dotenv` (see `playwright.config.ts` and `tests/setup/auth.setup.ts`) and are never written to tracked files. Never use production credentials; follow your team's credential-storage policy and rotate any test credential that was committed unintentionally in the past.

## Generate and Run Tests

After changing a `.feature` file or its steps, regenerate the Playwright specs:

```powershell
npx bddgen
```

Run the full suite with readable per-test output:

```powershell
npx playwright test --reporter=list
```

To use the configured HTML reporter instead:

```powershell
npx playwright test
npx playwright show-report
```

A project-specific run is also available. Setup dependencies run automatically when required:

```powershell
npx playwright test --project=exploreview-instruments --reporter=list
```

Configured projects are `login`, `landing`, `home`, `explore-substation-overview`, `explore-electrical`, `exploreview-tabs`, and `exploreview-instruments`. Setup projects for authentication, customer selection, and opening the selected substation overview run as dependencies where needed.

Run one tagged Instruments scenario, for example:

```powershell
npx playwright test --project=exploreview-instruments --grep "@visnet-hub" --reporter=list
```

Run tests in debug mode:

```powershell
npm run test:debug -- --project=exploreview-instruments
```

## How Setup Works

The setup projects prepare state for the feature tests:

1. `auth.setup.ts` signs in and saves browser storage state under `playwright/.auth/`.
2. `customer.setup.ts` selects the customer from `testdata.json` and saves the customer-selected state.
3. `overview.setup.ts` searches for the configured substation from `testdata.json`, switches to Grid view, opens that substation's Explore view, and saves its overview URL.

These state files are generated locally and ignored by Git. Playwright runs with one worker to keep setup and shared test data predictable.

## Reading Results

- The terminal summary reports passed, failed, and skipped tests.
- The default HTML reporter writes a report to `playwright-report`; open it with `npx playwright show-report`.
- Failure screenshots, videos, and error context are saved under `test-results`.
- A test may be skipped when the selected substation does not have the instrument or optional filter that the scenario requires. A skip is not a passing assertion for that instrument; choose a substation with that equipment to exercise the scenario.

## Common Troubleshooting

- **Substation not found:** Confirm `substation_name` in `testdata.json` matches a visible substation name and that the account/customer can access it.
- **Login fails:** Confirm `base_url` in `testdata.json`, and `LOGIN_USERNAME`/`LOGIN_PASSWORD` in your local `.env` file.
- **"LOGIN_USERNAME and LOGIN_PASSWORD must be set" error:** Create `.env` from `.env.example` and set both values.
- **Playwright cannot launch a browser:** Run `npx playwright install chromium`.
- **A feature or step is missing after edits:** Run `npx bddgen`, then rerun Playwright.
- **A scenario is skipped:** Check whether the selected substation has the instrument/filter required by that scenario.
