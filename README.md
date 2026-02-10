# 🎭 Playwright Automation Framework

[![Playwright Tests](https://github.com/joaquinpiedracueva/test-automation-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/joaquinpiedracueva/test-automation-framework/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/playwright-v1.58.1-FFFFFF)
[![Report](https://img.shields.io/badge/Test_Report-GitHub_Pages-blue)](https://joaquinpiedracueva.github.io/test-automation-framework/)

A comprehensive Playwright + TypeScript test automation framework demonstrating cross-browser UI, API, accessibility, and visual regression testing.

## Getting Started

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npx playwright test

# Show HTML report
npx playwright show-report
```

### Available Projects

| Project                                                                   | Description                                         |
| ------------------------------------------------------------------------- | --------------------------------------------------- |
| `ui-web-chromium`, `ui-web-firefox`, `ui-web-webkit`                      | Cross-browser UI tests against saucedemo.com        |
| `ui-mobile-chromium`, `ui-mobile-webkit`                                  | Mobile viewport tests (Pixel 7, iPhone 15)          |
| `api`                                                                     | REST API tests against restful-booker.herokuapp.com |
| `accessibility-chromium`, `accessibility-firefox`, `accessibility-webkit` | WCAG compliance tests using axe-core                |

## Test Structure

tests are split by concern for easier maintenance and selective execution:

```
tests/
  ui-web-login.test.ts          # Login flows, error handling, credentials
  ui-web-elements.test.ts       # Element visibility checks for all pages
  ui-web-screenshots.test.ts    # Visual regression screenshots
  ui-mobile-login.test.ts       # Mobile login flows
  ui-mobile-elements.test.ts    # Mobile element visibility checks
  ui-mobile-screenshots.test.ts # Mobile visual regression screenshots
  accessibility.test.ts         # WCAG compliance tests (a11y.me)
  api.test.ts                   # REST API tests
```

Config uses glob patterns (`ui-web-*.test.ts`, `ui-mobile-*.test.ts`) so new test files are automatically picked up by the matching projects.

## Architecture

### Custom Fixtures

Extends Playwright's base test with Page Object fixtures. Tests import from `./test` instead of `@playwright/test`:

```typescript
import {test, expect} from "../test";
```

### Page Object Model

Page and component classes encapsulate locators in `page-objects/`. Shared UI regions (header, sidebar, footer) are modeled as independent component classes rather than a base class with inheritance. This is a deliberate choice for readability: when a test clicks a sidebar link, it references `sidebarComponent.logoutLink` instead of `inventoryPage.logoutLink`, making it clear which UI component is being interacted with.

```
page-objects/
  login-page.ts              # Login-specific locators
  inventory-page.ts          # Inventory-specific locators (sort, items)
  inventory-item-page.ts     # Item detail page locators
  cart-page.ts               # Cart page locators
  checkout-step-one-page.ts  # Checkout info form locators
  checkout-step-two-page.ts  # Checkout overview locators
  checkout-complete-page.ts  # Order confirmation locators
  header-component.ts        # Shared header (logo, cart, menu buttons)
  sidebar-component.ts       # Shared sidebar (nav links)
  footer-component.ts        # Shared footer (social links, copyright)
```

```typescript
// Tests reference the actual component, not a page that inherits it
test("example", async ({
  headerComponent,
  sidebarComponent,
  footerComponent,
  inventoryPage
}) => {
  await headerComponent.shoppingCartLink.click();
  await sidebarComponent.logoutLink.click();
  await expect(footerComponent.container).toBeVisible();
  await expect(inventoryPage.title).toHaveText("Products");
});
```

### Accessibility Testing

Uses [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) for WCAG 2.0/2.1/2.2, Section 508, and best-practice checks against ACCESSIBILITY.me.

### Visual Baselines

Screenshots stored in `baselines/` with platform-specific paths:

- `baselines/web/` - Desktop browsers
- `baselines/mobile/android/` - Android viewports
- `baselines/mobile/ios/` - iOS viewports

### Playwright CLI

Page object locators and tests were built using [playwright-cli](https://github.com/microsoft/playwright-cli) to interactively inspect the DOM, identify `data-test` attributes, and verify element states before adding them to the Page Object Model and test tests.

### Environments

The `ENV` variable selects which environment file to load from `env/`. Defaults to `prod` if not set.

```bash
# Run against production (default)
npx playwright test

# Run against local
ENV=local npx playwright test
```

On startup, the active environment and URLs are logged to the console:

```
Environment: prod
UI:            https://www.saucedemo.com/
API:           https://restful-booker.herokuapp.com/
Accessibility: https://a11y.me/
```

| Environment | File             | UI             | API                          | Accessibility  |
| ----------- | ---------------- | -------------- | ---------------------------- | -------------- |
| `prod`      | `env/.env.prod`  | saucedemo.com  | restful-booker.herokuapp.com | a11y.me        |
| `local`     | `env/.env.local` | localhost:3000 | localhost:3000               | localhost:3000 |

To add a new environment, create `env/.env.<name>` with `UI_BASE_URL`, `API_BASE_URL`, and `ACCESSIBILITY_BASE_URL`, then run with `ENV=<name>`.

In CI, the workflow defaults to `prod`. Use the **"Run workflow"** button in GitHub Actions to manually trigger against a different environment.
