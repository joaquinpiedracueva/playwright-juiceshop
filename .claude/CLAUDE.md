# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run all tests (defaults to prod environment)
npx playwright test

# Run against a specific environment
ENV=local npx playwright test

# Run a single project
npx playwright test --project=ui-web-chromium

# Run a single test file
npx playwright test tests/ui-web-login.test.ts

# Run tests matching a grep pattern
npx playwright test -g "should display error"

# Update visual baselines
npx playwright test --update-snapshots

# Show HTML report
npx playwright show-report
```

## Architecture

### Environment Configuration

`playwright.config.ts` loads `env/.env.${ENV || 'prod'}` via dotenv. Each env file defines `UI_BASE_URL`, `API_BASE_URL`, `ACCESSIBILITY_BASE_URL`, and test credentials. Tests use relative paths (`page.goto('/')`) — never hardcoded URLs.

To add a new environment, create `env/.env.<name>` with the same variables.

### Custom Fixtures (test.ts)

All tests import from `../test`, not `@playwright/test`. This extends Playwright's base test with fixtures for every page object and component, plus `axeBuilder` for accessibility.

### Page Object Model (page-objects/)

- **No inheritance** — shared UI regions (header, sidebar, footer) are independent component classes
- All locators are `readonly` properties set in the constructor
- Pages expose a `url` property (e.g., `/inventory.html`) used in assertions
- Primary locator strategy: `page.getByTestId()` (config sets `testIdAttribute: 'data-test'`)

### Test File Naming

Pattern: `{type}-{platform}-{concern}.test.ts` — e.g., `ui-web-login.test.ts`, `ui-mobile-elements.test.ts`. Config uses glob patterns (`ui-web-*.test.ts`) so new files are auto-discovered by matching projects.

### CI vs Local

`process.env.CI` toggles workers (2 vs 8), retries (1 vs 1), timeouts, screenshot diff thresholds, and reporters (`blob` for sharding vs `html`). GitHub Actions runs 4 shards in parallel with `fail-fast: true` to cancel remaining shards on failure. `maxFailures` is intentionally disabled so retries run fully and flaky tests are properly detected in merged reports.

### Visual Baselines

Snapshots are platform-segregated: `baselines/web/`, `baselines/mobile/android/`, `baselines/mobile/ios/`.
