# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Playwright + TypeScript end-to-end test automation framework for OWASP Juice Shop (v16.0.1). ES Module project targeting `http://localhost:3000` with the app running via Docker Compose.

## Commands

```bash
# Start the app (required before running tests)
docker compose up -d

# Run all tests
npx playwright test

# Run by project
npx playwright test --project api
npx playwright test --project ui-chromium
npx playwright test --project ui-firefox
npx playwright test --project ui-webkit
npx playwright test --project ui-mobile-pixel
npx playwright test --project ui-mobile-iphone

# Run a single test file
npx playwright test tests/ui/login.test.ts

# Run tests matching a tag
npx playwright test --grep @desktop-only

# Run headed (visible browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# View last report
npx playwright show-report

# Lint and format
npm run lint
npm run format:check
npm run format
```

## Architecture

### Test Projects & Auth Flow

The Playwright config defines 7 projects: `api`, `ui-auth` (setup), `ui-chromium`, `ui-firefox`, `ui-webkit`, `ui-mobile-pixel`, `ui-mobile-iphone`. All UI browser projects depend on `ui-auth`, which registers a test user and saves session state to `.auth/auth.json`. Browser projects inherit this auth state via `storageState`.

### Directory Layout

- `tests/page-objects/` — Page Object Model classes (HomePage, LoginPage, RegisterPage, NavComponent, SidebarComponent). Each wraps a `Page` and exposes typed `Locator` properties and action methods.
- `tests/fixtures/ui.ts` — Extends `@playwright/test` with page object instances and axe accessibility builder. Auto-navigates to `/` before each test.
- `tests/fixtures/api.ts` — Extends `@playwright/test` with `registerUser()` and `loginUser()` helper functions for API-level auth.
- `tests/helpers/` — Data generation utilities (`generateEmail`, `generatePassword`) and security question data.
- `tests/setup/auth.ui.setup.ts` — One-time auth setup that skips if `.auth/auth.json` already exists.
- `tests/baselines/` — Screenshot baselines split into `desktop/` and `mobile/` subdirectories.
- `global-teardown.ts` — Runs `docker compose down` after all tests.

### Test Tags

Every UI test must have a tag (enforced by ESLint `playwright/require-test-tag`):

- `@desktop-only` — Excluded from mobile projects
- `@mobile-only` — Excluded from desktop projects
- `@screenshot` — Visual regression; only runs on chromium and mobile-iphone projects

### Key Patterns

- **Import from fixtures, not from `@playwright/test` directly** — UI tests import `test` and `expect` from `tests/fixtures/ui.ts`; API tests from `tests/fixtures/api.ts`.
- **Page objects use web-first locators** — `getByRole`, `getByLabel`, `getByText` preferred over CSS/XPath selectors.
- **Screenshot tests** use `toHaveScreenshot()` with `maxDiffPixelRatio: 0.03` and separate baseline paths per device class.

## Code Quality

- **ESLint**: Flat config with strict Playwright rules — no `.only`, no `page.pause()`, no `waitForSelector`/`waitForTimeout`, no `force: true`, no `page.$eval()`, web-first assertions required, zero warnings allowed.
- **Prettier**: Single quotes, 2-space indent, 120 char line width.
- **Pre-commit hook** (Husky): Runs `npm run lint` and `npm run format:check`.

## CI

GitHub Actions workflow shards tests across 2 runners, merges blob reports, and deploys HTML report to GitHub Pages. CI uses single-worker mode, 60s timeouts, and 1 retry. Juice Shop runs as a Docker service container.
