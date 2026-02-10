# 🎭 Playwright Automation Framework

![Playwright](https://img.shields.io/badge/playwright-v1.58.1-FFFFFF)

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

Specs are split by concern for easier maintenance and selective execution:

```
specs/
  ui-web-login.spec.ts          # Login flows, error handling, credentials
  ui-web-elements.spec.ts       # Element visibility checks for all pages
  ui-web-screenshots.spec.ts    # Visual regression screenshots
  ui-mobile-login.spec.ts       # Mobile login flows
  ui-mobile-elements.spec.ts    # Mobile element visibility checks
  ui-mobile-screenshots.spec.ts # Mobile visual regression screenshots
  accessibility.spec.ts         # WCAG compliance tests (a11y.me)
  api.spec.ts                   # REST API tests
```

Config uses glob patterns (`ui-web-*.spec.ts`, `ui-mobile-*.spec.ts`) so new spec files are automatically picked up by the matching projects.

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
test('example', async ({ headerComponent, sidebarComponent, footerComponent, inventoryPage }) => {
  await headerComponent.shoppingCartLink.click();
  await sidebarComponent.logoutLink.click();
  await expect(footerComponent.container).toBeVisible();
  await expect(inventoryPage.title).toHaveText('Products');
});
```

### Accessibility Testing

Uses [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) for WCAG 2.0/2.1/2.2, Section 508, and best-practice checks against a11y.me.

### Visual Baselines

Screenshots stored in `baselines/` with platform-specific paths:

- `baselines/web/` - Desktop browsers
- `baselines/mobile/android/` - Android viewports
- `baselines/mobile/ios/` - iOS viewports

### Playwright CLI

Page object locators and tests were built using [playwright-cli](https://github.com/microsoft/playwright-cli) to interactively inspect the DOM, identify `data-test` attributes, and verify element states before adding them to the Page Object Model and test specs.

### Environment Variables

Test credentials loaded from `.env` via dotenv. The `.env` file is tracked in git as it contains only public saucedemo.com test credentials for demonstration purposes.
