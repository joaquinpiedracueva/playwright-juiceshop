import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default [
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.ts'],
    languageOptions: {
      ...playwright.configs['flat/recommended'].languageOptions,
      parser: tseslint.parser,
    },
    rules: {
      'playwright/consistent-spacing-between-blocks': 'error', // Enforce consistent spacing between test blocks
      'playwright/expect-expect': 'error', // Enforce assertion to be made in a test body
      'playwright/max-nested-describe': 'error', // Enforce a maximum depth to nested describe calls
      'playwright/no-conditional-expect': 'error', // Disallow calling expect conditionally
      'playwright/no-conditional-in-test': 'error', // Disallow conditional logic in tests
      'playwright/no-element-handle': 'error', // Disallow usage of element handles
      'playwright/no-eval': 'error', // Disallow usage of page.$eval() and page.$$eval()
      'playwright/no-force-option': 'error', // Disallow usage of the { force: true } option
      'playwright/no-nested-step': 'error', // Disallow nested test.step() methods
      'playwright/no-page-pause': 'error', // Disallow using page.pause()
      'playwright/no-skipped-test': 'error', // Disallow usage of the .skip annotation
      'playwright/no-useless-await': 'error', // Disallow unnecessary awaits for Playwright methods
      'playwright/no-useless-not': 'error', // Disallow not matchers when a specific matcher exists
      'playwright/no-wait-for-selector': 'error', // Disallow usage of page.waitForSelector()
      'playwright/no-wait-for-timeout': 'error', // Disallow usage of page.waitForTimeout()
      'playwright/missing-playwright-await': 'error', // Enforce Playwright APIs to be awaited
      'playwright/no-focused-test': 'error', // Disallow usage of .only annotation
      'playwright/no-networkidle': 'error', // Disallow usage of the networkidle option
      'playwright/no-standalone-expect': 'error', // Disallow using expect outside of test blocks
      'playwright/no-unsafe-references': 'error', // Prevent unsafe variable references in page.evaluate()
      'playwright/no-unused-locators': 'error', // Disallow unused page locators
      'playwright/no-wait-for-navigation': 'error', // Disallow usage of page.waitForNavigation()
      'playwright/prefer-web-first-assertions': 'error', // Suggest using web first assertions
      'playwright/valid-describe-callback': 'error', // Enforce valid describe() callback
      'playwright/valid-expect': 'error', // Enforce valid expect() usage
      'playwright/valid-expect-in-promise': 'error', // Require promises with expectations to be valid
      'playwright/valid-test-tags': 'error', // Enforce valid tag format in test blocks
      'playwright/valid-title': 'error', // Enforce valid titles
      'playwright/max-expects': 'error', // Enforce a maximum number of expects per test
      'playwright/no-commented-out-tests': 'error', // Disallow commented out tests
      'playwright/no-duplicate-hooks': 'error', // Disallow duplicate setup and teardown hooks
      'playwright/no-duplicate-slow': 'error', // Disallow multiple test.slow() calls in the same test
      'playwright/no-get-by-title': 'error', // Disallow using getByTitle()
      'playwright/no-hooks': 'off', // Disallow setup and teardown hooks
      'playwright/no-nth-methods': 'off', // Disallow usage of first(), last(), and nth() methods
      'playwright/no-raw-locators': 'off', // Disallow using raw locators
      'playwright/no-restricted-locators': 'error', // Disallow specific locator methods
      'playwright/no-restricted-matchers': 'error', // Disallow specific matchers and modifiers
      'playwright/no-restricted-roles': 'error', // Disallow specific roles in getByRole()
      'playwright/no-slowed-test': 'error', // Disallow usage of the .slow annotation
      'playwright/prefer-comparison-matcher': 'error', // Suggest using built-in comparison matchers
      'playwright/prefer-equality-matcher': 'error', // Suggest using built-in equality matchers
      'playwright/prefer-hooks-in-order': 'error', // Prefer having hooks in a consistent order
      'playwright/prefer-hooks-on-top': 'error', // Suggest having hooks before any test cases
      'playwright/prefer-locator': 'error', // Suggest locators over page methods
      'playwright/prefer-lowercase-title': 'error', // Enforce lowercase test names
      'playwright/prefer-native-locators': 'error', // Suggest built-in locators over page.locator()
      'playwright/prefer-strict-equal': 'off', // Suggest using toStrictEqual()
      'playwright/prefer-to-be': 'error', // Suggest using toBe()
      'playwright/prefer-to-contain': 'error', // Suggest using toContain()
      'playwright/prefer-to-have-count': 'error', // Suggest using toHaveCount()
      'playwright/prefer-to-have-length': 'error', // Suggest using toHaveLength()
      'playwright/require-hook': 'off', // Require setup and teardown code to be within a hook
      'playwright/require-soft-assertions': 'off', // Require assertions to use expect.soft()
      'playwright/require-tags': 'off', // Require test blocks to have tags
      'playwright/require-to-pass-timeout': 'error', // Require a timeout option for toPass()
      'playwright/require-to-throw-message': 'error', // Require a message for toThrow()
      'playwright/require-top-level-describe': 'error', // Require test cases and hooks to be inside a describe block
    },
  },
  {
    files: ['tests/ui/**/*.ts'],
    rules: {
      'playwright/require-tags': 'error', // Require test blocks to have tags
    },
  },
];
