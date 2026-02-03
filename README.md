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

## Running Tests

```bash
# Run specific test file
npx playwright test tests/ui-web.spec.ts

# Run specific project
npx playwright test --project=ui-web-chromium

# Run single test by name
npx playwright test -g "should login successfully"

# Update visual baselines
npx playwright test --update-snapshots
```

### Available Projects

| Project                                                                   | Description                                         |
| ------------------------------------------------------------------------- | --------------------------------------------------- |
| `ui-web-chromium`, `ui-web-firefox`, `ui-web-webkit`                      | Cross-browser UI tests against saucedemo.com        |
| `ui-mobile-chromium`, `ui-mobile-webkit`                                  | Mobile viewport tests (Pixel 7, iPhone 15)          |
| `api`                                                                     | REST API tests against restful-booker.herokuapp.com |
| `accessibility-chromium`, `accessibility-firefox`, `accessibility-webkit` | WCAG compliance tests using axe-core                |

## Architecture

### Custom Fixtures

Extends Playwright's base test with Page Object fixtures. Tests import from `./test` instead of `@playwright/test`:

```typescript
import {test, expect} from "../test";
```

### Page Object Model

Page classes encapsulate locators and actions in `page-objects/`:

```typescript
export class LoginPage {
  readonly usernameInput: Locator;
  async login(username: string, password: string) { ... }
}
```

### Visual Baselines

Screenshots stored in `baselines/` with platform-specific paths:

- `baselines/web/` - Desktop browsers
- `baselines/mobile/android/` - Android viewports
- `baselines/mobile/ios/` - iOS viewports

### Environment Variables

Test credentials loaded from `.env` via dotenv. The `.env` file is tracked in git as it contains only public saucedemo.com test credentials for demonstration purposes.
