import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

export default defineConfig({
  use: {
    testIdAttribute: 'data-test'
  },
  testDir: './specs',
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
    // UI Web tests (desktop browsers)
    {
      name: 'ui-web-chromium',
      testMatch: 'ui-web.spec.ts',
      snapshotPathTemplate: 'baselines/web/{arg}{ext}',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com/',
      },
    },
    {
      name: 'ui-web-firefox',
      testMatch: 'ui-web.spec.ts',
      snapshotPathTemplate: 'baselines/web/{arg}{ext}',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://www.saucedemo.com/',
      },
    },
    {
      name: 'ui-web-webkit',
      testMatch: 'ui-web.spec.ts',
      snapshotPathTemplate: 'baselines/web/{arg}{ext}',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://www.saucedemo.com/',
      },
    },
    
    // Non-browser projects
    {
      name: 'api',
      testMatch: 'api.spec.ts',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com/',
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

    // UI Mobile tests (mobile viewports)
    {
      name: 'ui-mobile-chromium',
      testMatch: 'ui-mobile.spec.ts',
      snapshotPathTemplate: 'baselines/mobile/android/{arg}{ext}',
      use: {
        ...devices['Pixel 7'],
        baseURL: 'https://www.saucedemo.com/',
      },
    },
    {
      name: 'ui-mobile-webkit',
      testMatch: 'ui-mobile.spec.ts',
      snapshotPathTemplate: 'baselines/mobile/ios/{arg}{ext}',
      use: {
        ...devices['iPhone 15'],
        baseURL: 'https://www.saucedemo.com/',
      },
    },

  ],
});