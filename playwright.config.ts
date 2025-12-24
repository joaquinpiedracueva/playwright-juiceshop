import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  snapshotPathTemplate: 'baselines/{arg}{ext}',
  fullyParallel: true,
  expect: {
    timeout: process.env.CI ? 60000 : 45000,
    toHaveScreenshot: process.env.CI ? { maxDiffPixelRatio: 0.04 } : { maxDiffPixelRatio: 0.03 },
  },
  forbidOnly: process.env.CI ? true : false,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 3,
  reporter: process.env.CI ? [['github'], ['html']] : [['html']],
  timeout: process.env.CI ? 120000 : 90000,
  projects: [
    // Non-browser projects
    {
      name: 'api',
      testMatch: 'api.spec.ts',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com/',
      },
    },
    {
      name: 'nosql',
      testMatch: 'nosql.spec.ts',
    },
    {
      name: 'sql',
      testMatch: 'sql.spec.ts',
    },

    // UI tests
    {
      name: 'ui-chromium',
      testMatch: 'ui.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://uitestingplayground.com/',
      },
    },
    {
      name: 'ui-firefox',
      testMatch: 'ui.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'http://uitestingplayground.com/',
      },
    },
    {
      name: 'ui-webkit',
      testMatch: 'ui.spec.ts',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'http://uitestingplayground.com/',
      },
    },

    // Accessibility tests
    {
      name: 'accessibility-chromium',
      testMatch: 'accessibility.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://a11y.me/',
      },
    },
    {
      name: 'accessibility-firefox',
      testMatch: 'accessibility.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://a11y.me/',
      },
    },
    {
      name: 'accessibility-webkit',
      testMatch: 'accessibility.spec.ts',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://a11y.me/',
      },
    },

    // Visual tests
    {
      name: 'visual-chromium',
      testMatch: 'visual.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://uitestingplayground.com/',
      },
    },
    {
      name: 'visual-firefox',
      testMatch: 'visual.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'http://uitestingplayground.com/',
      },
    },
    {
      name: 'visual-webkit',
      testMatch: 'visual.spec.ts',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'http://uitestingplayground.com/',
      },
    },
  ],
});