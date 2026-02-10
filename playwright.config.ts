import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.ENV || 'prod';
dotenv.config({ path: path.resolve(__dirname, `env/.env.${ENV}`), quiet: true });

export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
  use: {
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: process.env.CI ? 'off' : 'retain-on-failure',
  },
  testDir: './tests',
  fullyParallel: true,
  expect: {
    timeout: process.env.CI ? 60000 : 45000,
    toHaveScreenshot: process.env.CI ? { maxDiffPixelRatio: 0.04 } : { maxDiffPixelRatio: 0.03 },
  },
  forbidOnly: process.env.CI ? true : false,
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 2 : 8,
  reporter: process.env.CI ? [['github'], ['blob']] : [['html']],
  timeout: process.env.CI ? 120000 : 90000,
  projects: [
    // UI Web tests (desktop browsers)
    {
      name: 'ui-web-chromium',
      testMatch: 'ui-web-*.test.ts',
      snapshotPathTemplate: 'baselines/web/{arg}{ext}',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL!,
      },
    },
    {
      name: 'ui-web-firefox',
      testMatch: 'ui-web-*.test.ts',
      snapshotPathTemplate: 'baselines/web/{arg}{ext}',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.UI_BASE_URL!,
      },
    },
    {
      name: 'ui-web-webkit',
      testMatch: 'ui-web-*.test.ts',
      snapshotPathTemplate: 'baselines/web/{arg}{ext}',
      use: {
        ...devices['Desktop Safari'],
        baseURL: process.env.UI_BASE_URL!,
      },
    },
    
    // Non-browser projects
    {
      name: 'api',
      testMatch: 'api.test.ts',
      use: {
        baseURL: process.env.API_BASE_URL!,
      },
    },

    // Accessibility tests
    {
      name: 'accessibility-chromium',
      testMatch: 'accessibility.test.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.ACCESSIBILITY_BASE_URL!,
      },
    },
    {
      name: 'accessibility-firefox',
      testMatch: 'accessibility.test.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.ACCESSIBILITY_BASE_URL!,
      },
    },
    {
      name: 'accessibility-webkit',
      testMatch: 'accessibility.test.ts',
      use: {
        ...devices['Desktop Safari'],
        baseURL: process.env.ACCESSIBILITY_BASE_URL!,
      },
    },

    // UI Mobile tests (mobile viewports)
    {
      name: 'ui-mobile-chromium',
      testMatch: 'ui-mobile-*.test.ts',
      snapshotPathTemplate: 'baselines/mobile/android/{arg}{ext}',
      use: {
        ...devices['Pixel 7'],
        baseURL: process.env.UI_BASE_URL!,
      },
    },
    {
      name: 'ui-mobile-webkit',
      testMatch: 'ui-mobile-*.test.ts',
      snapshotPathTemplate: 'baselines/mobile/ios/{arg}{ext}',
      use: {
        ...devices['iPhone 15'],
        baseURL: process.env.UI_BASE_URL!,
      },
    },

  ],
});