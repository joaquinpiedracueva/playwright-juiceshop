# Playwright Automation Framework

## Structure

```
├── .github/
│   └── workflows/
│       └── playwright.yml   # CI workflow for GitHub Actions
├── .gitignore
├── README.md
├── fixtures.ts              # Custom Playwright fixtures with page object injection
├── package.json             # Dependencies and scripts
├── package-lock.json
├── playwright.config.ts     # Test configuration and project definitions
├── tsconfig.json            # TypeScript configuration
├── pages/                   # Page Object Model classes
│   ├── HomePage.ts
│   ├── DynamicIdPage.ts
│   └── ...
├── tests/
│   ├── ui.spec.ts           # Cross-browser UI tests
│   ├── api.spec.ts          # REST API tests
│   ├── accessibility.spec.ts # axe-core a11y tests
│   ├── visual.spec.ts       # Screenshot comparison tests
│   ├── sql.spec.ts          # SQLite CRUD tests
│   └── nosql.spec.ts        # MongoDB CRUD tests
├── baselines/               # Visual regression baseline images
│   ├── HomePage.png
│   ├── DynamicIdPage.png
│   └── ...
├── test-results/            # Test execution artifacts
└── playwright-report/       # HTML report output
```

## Commands

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/ui.spec.ts

# Run specific project (defined in playwright.config.ts)
npx playwright test --project=api
npx playwright test --project=ui-chromium
npx playwright test --project=accessibility-chromium
npx playwright test --project=visual-chromium
npx playwright test --project=sql
npx playwright test --project=nosql

# Run single test by name
npx playwright test -g "HomePage"

# Update visual regression baselines
npx playwright test --project=visual-chromium --update-snapshots

# Show HTML report
npx playwright show-report
```

## Architecture

### Test Types and Projects

- **UI Tests** (`ui.spec.ts`): Browser-based tests against uitestingplayground.com. Run on Chromium, Firefox, and WebKit.
- **API Tests** (`api.spec.ts`): REST API tests against restful-booker.herokuapp.com. No browser required.
- **Accessibility Tests** (`accessibility.spec.ts`): axe-core based a11y testing against a11y.me. Multi-browser.
- **Visual Tests** (`visual.spec.ts`): Screenshot comparison tests. Baselines stored in `baselines/`.
- **SQL Tests** (`sql.spec.ts`): In-memory SQLite database CRUD tests using sql.js.
- **NoSQL Tests** (`nosql.spec.ts`): MongoDB CRUD tests using mongodb-memory-server.

### Page Object Model

- **`fixtures.ts`**: Custom Playwright fixtures that inject page objects into tests. Import `test` and `expect` from here instead of `@playwright/test`.
- **`pages/`**: Page object classes. Each page encapsulates locators (defined in constructor parameters) and action methods.

### Test Naming Convention

Tests use TypeScript template literal types for structured naming:
```typescript
type TestCase = `${Method} - ${Endpoint} - ${Operation} - ${StatusCode}`;
test('POST - /auth - CreateToken - 200 OK' satisfies TestCase, ...);
```

### Configuration (playwright.config.ts)

- Visual snapshot tolerance: 3% pixel difference ratio
- CI mode: Uses GitHub reporter, single worker, 1 retry
- Local mode: HTML reporter, 3 workers, no retries